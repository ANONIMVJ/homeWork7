document.addEventListener("DOMContentLoaded", function () {
    const DisplayModes = {
        TABLE: "table",
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal",
    };

    let products = [];
    let displayMode = DisplayModes.TABLE;
    
    function fetchProducts() {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => {
                products = data;
                renderProducts();
            });
    }
    
    function setDisplayMode(mode) {
        displayMode = mode;
        renderProducts();
    }
    
    function renderProducts() {
        const container = document.getElementById("products-container");
        container.innerHTML = "";
        
        if (displayMode === DisplayModes.TABLE) {
            let table = `<table class='w-full border-collapse border border-gray-300'>
                            <thead>
                                <tr class='bg-gray-200'>
                                    <th class='border p-2'>Image</th>
                                    <th class='border p-2'>Title</th>
                                    <th class='border p-2'>Price</th>
                                </tr>
                            </thead>
                            <tbody>`;
            products.forEach(product => {
                table += `<tr class='border'>
                            <td class='border p-2'><img src='${product.image}' class='w-16 h-16' /></td>
                            <td class='border p-2'>${product.title}</td>
                            <td class='border p-2'>$${product.price}</td>
                          </tr>`;
            });
            table += `</tbody></table>`;
            container.innerHTML = table;
        }
        
        else if (displayMode === DisplayModes.VERTICAL) {
            let grid = `<div class='grid  md:grid-cols-3 gap-4'>`;
            products.forEach(product => {
                grid += `<div class='border rounded-lg p-4 shadow-lg'>
                            <img src='${product.image}' class='w-full h-40 object-contain' />
                            <h2 class='text-lg font-bold mt-2'>${product.title}</h2>
                            <p class='text-gray-600'>$${product.price}</p>
                         </div>`;
            });
            grid += `</div>`;
            container.innerHTML = grid;
        }
        
        else if (displayMode === DisplayModes.HORIZONTAL) {
            let list = `<div class='flex flex-col gap-4'>`;
            products.forEach(product => {
                list += `<div class='border rounded-lg p-4 shadow-md flex items-center gap-4'>
                            <img src='${product.image}' class='w-20 h-20 object-contain' />
                            <div>
                                <h2 class='text-lg font-bold'>${product.title}</h2>
                                <p class='text-gray-600'>$${product.price}</p>
                            </div>
                         </div>`;
            });
            list += `</div>`;
            container.innerHTML = list;
        }
    }
    
    document.getElementById("table-view").addEventListener("click", () => setDisplayMode(DisplayModes.TABLE));
    document.getElementById("vertical-view").addEventListener("click", () => setDisplayMode(DisplayModes.VERTICAL));
    document.getElementById("horizontal-view").addEventListener("click", () => setDisplayMode(DisplayModes.HORIZONTAL));
    
    fetchProducts();
});