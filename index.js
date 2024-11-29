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
        function addProduct(event) {
            event.preventDefault(); // Ngừng hành động gửi form mặc định

            // Lấy giá trị từ các trường trong form
            const productName = document.getElementById('productName').value;
            const productPrice = document.getElementById('productPrice').value;
            const productDescription = document.getElementById('productDescription').value;

            // Xử lý file ảnh
            const productImageFile = document.getElementById('productImageFile').files[0];
            if (!productImageFile) {
                alert("Vui lòng tải lên một ảnh sản phẩm!");
                return;
            }

            // Tạo URL tạm thời cho ảnh
            const productImageURL = URL.createObjectURL(productImageFile);

            // Tạo đối tượng sản phẩm
            const newProduct = {
                name: productName,
                price: productPrice,
                image: productImageURL,
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

            // Chuyển hướng đến trang giỏ hàng (tùy chọn)
            window.location.href = 'index.html';
        }
            