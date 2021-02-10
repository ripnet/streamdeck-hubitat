![Discord](https://img.shields.io/discord/803471871617531904?style=flat-square)
![macOS](https://img.shields.io/badge/macOS-✓-success?logo=apple&style=flat-square&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-✓-success?logo=windows-95&style=flat-square&logoColor=white)
![GitHub all releases](https://img.shields.io/github/downloads/ripnet/streamdeck-hubitat/total?style=flat-square)

# steamdeck-hubitat
[Hubitat](https://hubitat.com/) integration for the [Elgato Stream Deck](https://www.elgato.com/en/gaming/stream-deck)

![](resources/readme/example.png)

# Documentation

## Introduction
This plugin uses the Hubitat's Maker API and websockets to allow Stream Deck to control devices.

## Setup

### Hubitat
Install the [Maker API](https://docs.hubitat.com/index.php?title=Maker_API) app into Hubitat.

Make note of your `API_URL` and your `access_token`. ![](resources/readme/access_token.png)

### Stream Deck
Download the latest release from the [Releases](https://github.com/ripnet/streamdeck-hubitat/releases) page.

You should see the new category in the Stream Deck App
![](resources/readme/new_category.png)

#### Available Buttons
There are currently two buttons available
* Toggle Switch - This will toggle the state of a switch from off to on, or on to off.
* Set Switch - This will set the state of a switch to either on or off, regardless of its current state.

Drag an action button to a free button slot. Configure the button with the `API URL` of your hubitat. Paste in your `access_token` from the Maker API.
Click away from the input field and if everything has been setup properly, the list of devices should populate. Select the device you want to control and give it a name.

![](resources/readme/global_settings.png)

## Colors
Gray = No/Unknown Status

Green = Switch On

Red = Switch Off

# Support
Please use GitHub Issues for bugs or feature requests. Join me on my [Discord Server](https://discord.gg/J5tSRCMNbz) if you have any questions.

# License
`streamdeck-hubitat` is licensed under the [MIT License](LICENSE)
