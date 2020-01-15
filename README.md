# alt:V gangwar server

## Features
There are a lot of features. I will try to write down the most important.
* no dependencies and no mysql required
* player data stored in a JSON file
* admin commands and features
* player stats like level, kills, deaths
* several weapons on spawn
* nice notifications when a player enters a colshape
* different gangs with different clothes and vehicle colors
* killfeed
* gang stats
* level based vehicle spawner for every gang
* workshop to repair your vehicle and weapon refill point
* vehicle software tuning
* chat
* different timers like destroy vehicles without a driver every hour
* welcome screen to show rules and latest changelog
* .......

## Setup
Go to your `resources` folder and paste the files you downloaded. I prefer to clone this repository using git.
```
https://github.com/NicholasSchmitz/altV-gangwar-server.git
```

Edit your `server.cfg` file and paste the name of this resource to the resources array. Like this:
```
resources: [
    ...
    ...
    altV-gangwar-server
]
```

Make sure to check out `server/config.mjs` to change everything you want to. For example: Add a gang to the `teamData` object and the gang will be implemented automatically. There is no need to change anything else. Spawn, vehicle spawner, select team webview, teams overview... everything will be changed. Or if you want to change the weapons a player gets on spawn just change the `weapons` array. You can also change the handling of a vehicle by modifying the `vehicleTuning` object. Just make sure to look at the file.

Also make sure to add your socialId to the `admins` array. You will see your socialId in the console when you connect to the server.

### License
MIT License

Copyright (c) 2020 Nicholas Schmitz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
