---
id: version-1.0.0-watcher-monitoring
title: Watcher Monitoring
sidebar_label: Watcher Monitoring
original_id: watcher-monitoring
---

*By the end of this guide you should know how to monitor your Watcher installed on VPS or dedicated server. The guide is useful for enterprise clients who want to receive notifications about Watcher status, byzantine events, and alarms.*

## Goals

You should use this guide if you need to accomplish one of the following goals:
- Monitor the uptime of your Watcher's server.
- Automate regular Watcher status check.  
- Receive important alarms from the Watcher.

## Prerequisites

1. Active Watcher running on the VPS.
2. Basic knowledge of REST APIs.

## Overview

Watcher monitoring is one of the most important processes you need to set up if you're planning to work with the OMG Network over the long term. Receiving alarms and status changes can help to provide more accurate data for the services and applications you're building using the OMG Network, understand how reliable is your VPS provider, respond faster and more effectively to potential byzantine events on the network. 

## 1. Server Uptime Monitoring

### 1.1 Status Cake

To monitor the status of your server, you can use [Pingdom](https://www.pingdom.com/), [Status Cake](https://www.statuscake.com/) or similar software that provides website/VPS monitoring functionality. If you're using Status Cake, go to the `MONITORING > Uptime Monitoring` section, and select `New Uptime Test`. Choose `TCP` test type and fill the required values, including your server's IP address, port, test name, and contact group that contains details about users who will receive notifications.

![statuscake](/img/watcher/04.png)

Status Cake provides multiple ways to receive notifications, such as Datadog, Slack, Discord, Telegram, OpsGenie, etc. You can set your preferred method in the `ALERTING > Integrations` section.

![statuscake](/img/watcher/05.png)

## 2. Status Monitoring

Running the OMG Network's Watcher implies that you're running both `Watcher` and `Watcher Info` services that will serve separate [API endpoints](/api#watcher) and provide different access level to the network. Most of the time you'll be using `Watcher Info` service but you should monitor both.

It is possible for `Watcher` and `Watcher Info` to become inactive, even if its server is up. This can happen due to sudden configuration changes, internet, or hardware issues with your VPS provider. 

There are a few ways to monitor the status of these services. The simplest way is to send corresponding API requests on a certain schedule. This guide demonstrates [Datadog](https://www.datadoghq.com/) as one of the tools you can use to monitor various parts of your infrastructure.

### 2.1 Watcher Status

To monitor Watcher status, use the following steps:

1. Create [Datadog](https://www.datadoghq.com/) account.

2. Choose Ubuntu as OS for Datadog Agent.

3. Log in to the Watcher's server from your terminal:

```
ssh $USER@$REMOTE_SERVER -p $PORT
```

> - `$USER` - the name of the user with root privileges used to log into the remote server. Default: root.
> - `$REMOTE_SERVER` - an ip address of your remote server.
> - `$PORT` - a port used to connect to the server. Default: 22.

4. Paste the command from `New installation` to your server's terminal and press Enter:

![datadog](/img/watcher/06.png) 

The process may take a few minutes. After a successful installation on the server, your Datadog account will be redirected to the dashboard. 

5. Go to `UX Monitoring > Synthetic Tests`. Click `Get Started` and select the `New API Test`.

![datadog](/img/watcher/07.png) 

6. Fill in the following values and press `Test URL`:
- URL method: `POST`
- URL path: `http://$REMOTE_SERVER:7434/status.get`
- Name: some indication about this specific endpoint, e.g. `Watcher Status`
- Environment: environment name/identifier
- Locations: locations you want your API to be tested from

> - `$REMOTE_SERVER` - an ip address of your remote server.

![datadog](/img/watcher/08.png)

7. Specify test frequency.

Test frequency defines how often the API should be called. A general suggestion is 5-15 minutes.

8. Define assertions.

Assertions are conditions required for a test to pass. Our main condition is for a Watcher to return `success` status. To do that, select the `success` field in the `BODY` result section. This will add the corresponding assertion as follows:

![datadog](/img/watcher/09.png)

9. Define alert conditions.

Alert conditions help to set the number of failed tests, locations, retries needed to notify the team.

10. Set up notifications.

You can notify your team via email, Slack, Jira, Webhook, or dozens of other tools. Check [Datadog Notifications](https://docs.datadoghq.com/video-categories/notifications/) for more info.

11. Monitor the result.

You can monitor alerts, as well the status of your APIs in the `Events` or `UX Monitoring > Synthetic Tests` sections.

![datadog](/img/watcher/10.png)

### 2.2 Watcher Info Status

To set up the `Watcher Info` status check, create a new test, and replace the Define request as follows:

```
http://$REMOTE_SERVER:7534/stats.get
```