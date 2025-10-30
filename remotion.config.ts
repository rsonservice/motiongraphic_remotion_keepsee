// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDelayRenderTimeoutInMilliseconds(300000); // Increase timeout to 300 seconds (5 minutes)
Config.setConcurrency(1); // Reduce concurrency to avoid overwhelming the system
Config.setChromiumDisableWebSecurity(true); // Allow cross-origin requests
