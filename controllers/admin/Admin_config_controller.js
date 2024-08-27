"use strict";

const app = require("express").Router();
const Sequelize = require("sequelize");
const logger = require("../../services/LoggingService");
let pagination = require("../../services/PaginationService");
let SessionService = require("../../services/SessionService");
let JwtService = require("../../services/JwtService");
const ValidationService = require("../../services/ValidationService");
const PermissionService = require("../../services/PermissionService");
const UploadService = require("../../services/UploadService");
const AuthService = require("../../services/AuthService");
const db = require("../../models");
const helpers = require("../../core/helpers");

const role = 1;

app.get("/admin/terminate-configuration", SessionService.verifySessionMiddleware(role, "admin"), async function (req, res, next) {
  if (req.session.csrf === undefined) {
    req.session.csrf = SessionService.randomString(100);
  }

  const terminateAdminAddViewModel = require("../../view_models/terminate_admin_config_view_model");

  let terminateConfig;

  try {
    terminateConfig = await db.terminate_configuration.findByPk(1);
  } catch (error) {
    return next(error);
  }

  const viewModel = new terminateAdminAddViewModel(db.terminate_configuration, "Terminate Configuration", "", "", "/admin/terminate-configuration", {
    message: terminateConfig.message || '',
    counter: terminateConfig.counter || 0,
  });

  res.render("admin/Terminate_Configuration", viewModel);
});

app.post(
  "/admin/terminate-configuration",
  SessionService.verifySessionMiddleware(role, "admin"),
  ValidationService.validateInput(
    { message: "required", counter: "required" },
    {
      "message.required": "Message is required",
      "counter.required": "Counter is required and must be greater than 0",
    }
  ),
  async function (req, res, next) {
    if (req.session.csrf === undefined) {
      req.session.csrf = SessionService.randomString(100);
    }
    const terminateAdminAddViewModel = require("../../view_models/terminate_admin_config_view_model");

    const { message, counter } = req.body;

    const viewModel = new terminateAdminAddViewModel(
      db.terminate_configuration,
      "Terminate Configuration",
      "",
      "",
      "/admin/terminate-configuration",
      {
        message,
        counter,
      }
    );

    try {
      console.log(req.validationError);
      if (req.validationError) {
        viewModel.error = req.validationError;
        return res.render("admin/Terminate_Configuration", viewModel);
      }

      viewModel.session = req.session;

      let config = await db.terminate_configuration.findByPk(1);

      if (config) {
        await config.update({ message, counter: counter * 1 });
      } else {
        config = await db.terminate_configuration.create({
          id: 1,
          message,
          counter: counter * 1,
        });
      }

      await db.activity_log.create({
        action: config.isNewRecord ? "INSERT" : "UPDATE",
        name: "Admin_config_controller.js",
        portal: "admin",
        data: JSON.stringify({ message, counter }),
      });

      viewModel.success = config.isNewRecord ? "Termination message created successfully" : "Termination message updated successfully";
      return res.render("admin/Terminate_Configuration", viewModel);
    } catch (error) {
      console.error(error);
      viewModel.error = error.message || "Something went wrong";
      return res.render("admin/Terminate_Configuration", viewModel);
    }
  }
);

// APIS

app.get("/admin/terminate-configuration/default", async function (req, res, next) {
  try {
    const config = await db.terminate_configuration.findByPk(1);

    if (!config) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    return res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
});



module.exports = app;
