/*
Nemlig.com orders downloader user script
Author: Michael Bisbjerg <michael@mbwarez.dk>

Facilitates downloading a users order history from Nemlig.com to make further processing possible
*/

async function getOrderDetails(orderId) {
    var details = await fetch('https://www.nemlig.com/webapi/order/GetOrderHistory?orderNumber=' + orderId)
        .then(response => response.json());

    return details;
}

async function getAllOrders() {
    const pageSize = 25;

    var allOrders = [];

    var results = await fetch('https://www.nemlig.com/webapi/order/GetBasicOrderHistory?skip=0&take=' + pageSize)
        .then(response => response.json());

    results.Orders.forEach(n => allOrders.push(n));

    let pageCount = results.NumberOfPages;
    for (i = 1; i < pageCount; i++) {
        var results = await fetch('https://www.nemlig.com/webapi/order/GetBasicOrderHistory?skip=' + (pageSize * i) + '&take=' + pageSize)
            .then(response => response.json());

        results.Orders.forEach(n => allOrders.push(n));
    }

    return allOrders;
}

async function updateAll() {
    var allOrders = await getAllOrders();
    var orderDetails = [];

    console.log('total orders ' + allOrders.length);
    for (i = 0; i < allOrders.length; i++) {
        let order = allOrders[i];
        let storageKey = "mbw_nemlig_order_" + order.Id;

        var details = localStorage.getItem(storageKey);

        if (!details) {
            console.log('fetching order ' + order.Id);
            details = await getOrderDetails(order.Id);

            // Only cache details if status=3 ("Faktureret")
            if (details.Status === 3) {
                localStorage.setItem(storageKey, JSON.stringify(details));
            }
        }
        else {
            details = JSON.parse(details);
        }

        orderDetails.push(details);
    }

    return orderDetails;
}

async function downloadAction() {
    var menuNode = document.getElementsByClassName('meta-menu__list')[0];
    var menuItem = document.createElement('li');
    menuItem.setAttribute('class', 'meta-menu__item');

    menuNode.prepend(menuItem);

    menuItem.innerHTML = '<a class="meta-menu__link" href="#"><strong>Downloading</strong></a>';

    var details = await updateAll();

    menuItem.innerHTML = '<a class="meta-menu__link" href="#"><strong>Downloaded ' + details.length + ' orders</strong></a>';

    var data = JSON.stringify(details);
    var downloadA = document.createElement('a');
    downloadA.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
    downloadA.download = 'orders.json';
    document.getElementsByTagName('body')[0].appendChild(downloadA);
    downloadA.click();

    window.setTimeout(function () {
        menuItem.remove();
        downloadA.remove();
    }, 10000);
}

window.performNemligOrdersDownload = downloadAction;