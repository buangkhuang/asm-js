        function addToCart(button) {
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productImage = button.getAttribute('data-image');

            const confirmAdd = window.confirm(`Bạn có muốn thêm sản phẩm "${productName}" vào giỏ hàng không?`);

            if (confirmAdd) {
                const cartItem = {
                    name: productName,
                    price: productPrice,
                    image: productImage
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));

            
                window.location.href = 'giohang.html';
            } else {
                
                alert('Sản phẩm chưa được thêm vào giỏ hàng.');
            }
        }
        // Hàm xử lý khi người dùng gửi form thêm sản phẩm
        function addProduct(event) {
            event.preventDefault(); // Ngừng hành động gửi form mặc định

            // Lấy giá trị từ các trường trong form
            const productName = document.getElementById('productName').value;
            const productPrice = document.getElementById('productPrice').value;
            const productImage = document.getElementById('productImage').value;
            const productDescription = document.getElementById('productDescription').value;

            // Tạo đối tượng sản phẩm
            const newProduct = {
                name: productName,
                price: productPrice,
                image: productImage,
                description: productDescription
            };

            // Lấy dữ liệu giỏ hàng hiện tại từ localStorage, nếu có
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Thêm sản phẩm mới vào giỏ hàng
            cart.push(newProduct);

            // Lưu lại giỏ hàng vào localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Thông báo cho người dùng
            alert('Sản phẩm đã được thêm vào giỏ hàng!');

            // Chuyển hướng đến trang giỏ hàng
            window.location.href = 'giohang.html';
        }
        // Lưu dữ liệu vào Local Storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Lấy dữ liệu từ Local Storage
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Hàm xử lý khi người dùng gửi form thêm sản phẩm
function addProduct(event) {
    event.preventDefault(); // Ngăn chặn hành động gửi form mặc định

    // Lấy giá trị từ các trường trong form
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0]?.name || '';

    // Tạo đối tượng sản phẩm
    const newProduct = {
        id: Date.now(), // Sử dụng thời gian để tạo ID duy nhất
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImage
    };

    // Lấy danh sách sản phẩm từ Local Storage
    const products = getFromLocalStorage('products');

    // Thêm sản phẩm mới vào danh sách
    products.push(newProduct);

    // Lưu lại danh sách vào Local Storage
    saveToLocalStorage('products', products);

    // Cập nhật giao diện
    renderProducts();

    // Reset form
    document.getElementById('productForm').reset();

    alert('Sản phẩm đã được thêm thành công!');
}

// Hàm hiển thị danh sách sản phẩm
function renderProducts() {
    const products = getFromLocalStorage('products');
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4';

        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image || 'placeholder.png'}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <p class="card-text">${product.description}</p>
                    <button class="btn btn-warning" onclick="editProduct(${product.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Xóa</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Hàm sửa sản phẩm
function editProduct(id) {
    const products = getFromLocalStorage('products');
    const product = products.find((p) => p.id === id);

    if (product) {
        // Điền thông tin sản phẩm vào form
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;

        // Khi sửa, thêm ID vào form để nhận diện
        document.getElementById('productForm').dataset.editingId = id;
    }
}// Lưu dữ liệu vào Local Storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Lấy dữ liệu từ Local Storage
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Hàm xử lý khi người dùng gửi form thêm sản phẩm
function addProduct(event) {
    event.preventDefault(); // Ngừng hành động gửi form mặc định

    // Lấy giá trị từ các trường trong form
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0];
    let imagePath = '';

    // Nếu người dùng chọn ảnh, lấy đường dẫn ảnh
    if (productImage) {
        imagePath = `uploads/${productImage.name}`;
    }

    // Tạo đối tượng sản phẩm
    const newProduct = {
        id: Date.now(), // Sử dụng thời gian để tạo ID duy nhất
        name: productName,
        price: productPrice,
        description: productDescription,
        image: imagePath // Lưu đường dẫn ảnh
    };

    // Lấy danh sách sản phẩm từ Local Storage
    const products = getFromLocalStorage('products');

    // Thêm sản phẩm mới vào danh sách
    products.push(newProduct);

    // Lưu lại danh sách vào Local Storage
    saveToLocalStorage('products', products);

    // Cập nhật giao diện
    renderProducts();

    // Reset form
    document.getElementById('productForm').reset();

    alert('Sản phẩm đã được thêm thành công!');
}

// Hàm hiển thị danh sách sản phẩm
function renderProducts() {
    const products = getFromLocalStorage('products');
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = ''; // Xóa nội dung cũ

    // Nếu không có sản phẩm nào
    if (products.length === 0) {
        productContainer.innerHTML = '<p class="text-center">Chưa có sản phẩm nào trong danh sách!</p>';
        return;
    }

    // Duyệt qua danh sách sản phẩm và tạo HTML
    products.forEach((product) => {
        const productCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image || 'placeholder.png'}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Giá: $${product.price}</p>
                        <p class="card-text">${product.description}</p>
                        <button class="btn btn-warning" onclick="editProduct(${product.id})">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Xóa</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// Hàm sửa sản phẩm
function editProduct(id) {
    const products = getFromLocalStorage('products');
    const product = products.find((p) => p.id === id);

    if (product) {
        // Điền thông tin sản phẩm vào form
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;

        // Khi sửa, thêm ID vào form để nhận diện
        document.getElementById('productForm').dataset.editingId = id;
    }
}

// Hàm xóa sản phẩm
function deleteProduct(id) {
    let products = getFromLocalStorage('products');
    products = products.filter((p) => p.id !== id);

    saveToLocalStorage('products', products);

    renderProducts();
    alert('Sản phẩm đã được xóa!');
}

// Hàm xử lý khi người dùng sửa sản phẩm
document.getElementById('productForm').addEventListener('submit', (event) => {
    const editingId = event.target.dataset.editingId;

    if (editingId) {
        // Nếu đang chỉnh sửa sản phẩm
        event.preventDefault();

        const products = getFromLocalStorage('products');
        const productIndex = products.findIndex((p) => p.id == editingId);

        if (productIndex > -1) {
            // Cập nhật sản phẩm
            products[productIndex].name = document.getElementById('productName').value;
            products[productIndex].price = document.getElementById('productPrice').value;
            products[productIndex].description = document.getElementById('productDescription').value;
            products[productIndex].image = document.getElementById('productImage').files[0]?.name || products[productIndex].image;

            // Lưu lại và làm mới giao diện
            saveToLocalStorage('products', products);
            renderProducts();

            alert('Sản phẩm đã được cập nhật!');
        }

        // Xóa trạng thái chỉnh sửa
        delete event.target.dataset.editingId;
        document.getElementById('productForm').reset();
    } else {
        // Nếu không chỉnh sửa thì thêm mới
        addProduct(event);
    }
});

// Hiển thị danh sách sản phẩm khi tải trang
document.addEventListener('DOMContentLoaded', renderProducts);


// Hàm xóa sản phẩm
function deleteProduct(id) {
    let products = getFromLocalStorage('products');
    products = products.filter((p) => p.id !== id);

    saveToLocalStorage('products', products);

    renderProducts();
    alert('Sản phẩm đã được xóa!');
}

// Hàm xử lý khi người dùng sửa sản phẩm
document.getElementById('productForm').addEventListener('submit', (event) => {
    const editingId = event.target.dataset.editingId;

    if (editingId) {
        // Nếu đang chỉnh sửa sản phẩm
        event.preventDefault();

        const products = getFromLocalStorage('products');
        const productIndex = products.findIndex((p) => p.id == editingId);

        if (productIndex > -1) {
            // Cập nhật sản phẩm
            products[productIndex].name = document.getElementById('productName').value;
            products[productIndex].price = document.getElementById('productPrice').value;
            products[productIndex].description = document.getElementById('productDescription').value;
            products[productIndex].image = document.getElementById('productImage').files[0]?.name || products[productIndex].image;

            // Lưu lại và làm mới giao diện
            saveToLocalStorage('products', products);
            renderProducts();

            alert('Sản phẩm đã được cập nhật!');
        }

        // Xóa trạng thái chỉnh sửa
        delete event.target.dataset.editingId;
        document.getElementById('productForm').reset();
    } else {
        // Nếu không chỉnh sửa thì thêm mới
        addProduct(event);
    }
});

// Hiển thị danh sách sản phẩm khi tải trang
document.addEventListener('DOMContentLoaded', renderProducts);
