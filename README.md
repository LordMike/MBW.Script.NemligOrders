# MBW.Script.NemligOrders

A user script to download all orders from Nemlig.com for further processing.

## "Installation"

The script can be run in any browser, with one of the below methods. The script will provide you a `orders.json` file after it has run. 

Status is reported in the top of the Nemlig.com page, next to the navigation pane.

### Method A: Developer console

Run the following JS in the developer console of a Nemlig.com site.

> fetch('https://raw.githubusercontent.com/LordMike/MBW.Script.NemligOrders/master/src/Nemlig.Com.Downloader.js').then(response => response.text()).then(script => eval(script)).then(() => window.performNemligOrdersDownload())

1. Open Nemlig.com (and log in)
2. Open the developer console - usually F12
3. In the Console, paste the above script
4. You should shortly receive an `orders.json` file with all your orders

### Method B: Bookmarklet

Store the following script as a [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet)

> javascript:(function()%7Bfetch('https%3A%2F%2Fraw.githubusercontent.com%2FLordMike%2FMBW.Script.NemligOrders%2Fmaster%2Fsrc%2FNemlig.Com.Downloader.js').then(response%20%3D%3E%20response.text()).then(script%20%3D%3E%20eval(script)).then(()%20%3D%3E%20window.performNemligOrdersDownload())%7D)()

## Analysis

The json file is somewhat self-explanatory. I have not made any effort to simplify it or similar. The format is defiend by Nemlig.com's (unofficial) API.

I have created an excel workbook with some prototype analysis that can be performed. There's a few graphs for cost over time etc.

1. Open the excel workbook from `analysis/`
2. On the first sheet (configuration), type in the full path to your `orders.json`
3. Refresh all data sources

# Notes

* This script is not malicious - but it is simple and (imo) written in an easy to understand fashion. So do read it through before running.
* The script caches orders in your Local HTML storage, so that the next run doesn't need to re-download all orders
