# MBW.Script.NemligOrders

A user script to download all orders from Nemlig.com for further processing.

## Usage: Developer console

Run the following JS in the developer console of a Nemlig.com site.

> fetch('https://raw.githubusercontent.com/LordMike/MBW.Script.NemligOrders/master/src/Nemlig.Com.Downloader.js').then(response => response.text()).then(script => eval(script)).then(() => window.performNemligOrdersDownload())


1. Open Nemlig.com (and log in)
2. Open the developer console - usually F12
3. In the Console, paste the above script
4. You should shortly receive an `orders.json` file with all your orders

## Usage: Bookmarklet

Store the following script as a [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet)

> javascript:(function()%7Bfetch('https%3A%2F%2Fraw.githubusercontent.com%2FLordMike%2FMBW.Script.NemligOrders%2Fmaster%2Fsrc%2FNemlig.Com.Downloader.js').then(response%20%3D%3E%20response.text()).then(script%20%3D%3E%20eval(script)).then(()%20%3D%3E%20window.performNemligOrdersDownload())%7D)()


# Notes

* This script is not malicious - but it is written in an easy to understand fashion. So do read it through before running.
* The script stores your orders in your Local HTML storage, so that the next run doesn't need to re-download all orders
