const cart = {};
const sales = { total: 0 };
const hiddenMenuItems = {};
const menuContainer = document.getElementById('menu');
const adminButton = document.getElementById('adminButton');
const adminPanel = document.getElementById('adminPanel');
const salesTotalDisplay = document.getElementById('salesTotal');
const categories = document.querySelectorAll('.category-button');
const totalDisplay = document.getElementById('total');
const cartElement = document.getElementById('cart');
const imagePreview = document.getElementById('imagePreview');
const newItemImage = document.getElementById('newItemImage');

// 장바구니 업데이트 함수
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // 기존 장바구니 아이템 초기화
    let total = 0;
    let totalItems = 0;

    // 장바구니 내용 순회
    for (const [name, { price, quantity }] of Object.entries(cart)) {
        total += price * quantity; // 총 금액 계산
        totalItems += quantity; // 총 개수 계산

        // 아이템 생성
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.dataset.name = name;

        // 드래그 앤 드롭 이벤트 추가
        item.draggable = true;
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData(
                'text/plain',
                JSON.stringify({ name, price, isFromMenu: false })
            );
        });

        const itemName = document.createElement('span');
        itemName.textContent = `${name} - ${price.toLocaleString()}원 x ${quantity}`;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('cart-item-buttons');

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => {
            if (cart[name].quantity > 1) {
                cart[name].quantity -= 1;
            } else {
                delete cart[name];
        
                // 숨겨진 메뉴 아이템 복구
                if (hiddenMenuItems[name]) {
                    const menuItem = hiddenMenuItems[name];
                    menuItem.style.display = 'flex'; // 메뉴 다시 보이기
                    delete hiddenMenuItems[name]; // 복구된 아이템은 hiddenMenuItems에서 제거
                }
            }
            updateCart();
        });
        

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
            cart[name].quantity += 1;
            updateCart();
        });

        buttonContainer.appendChild(minusButton);
        buttonContainer.appendChild(plusButton);

        item.appendChild(itemName);
        item.appendChild(buttonContainer);
        cartItemsContainer.appendChild(item);
    }

    totalDisplay.textContent = total.toLocaleString(); // 총합계 업데이트
    document.getElementById('totalItems').textContent = totalItems; // 총 아이템 개수 업데이트
}


// 메뉴에 새로운 아이템 추가
function addMenuItem(name, price, category = "all", image = null) {
    const item = document.createElement('div');
    item.classList.add('menu-item');
    item.draggable = true;
    item.dataset.name = name;
    item.dataset.price = price;
    item.dataset.category = category;

    const imageHtml = image
        ? `<img src="${image}" alt="${name}">`
        : `<img src="https://via.placeholder.com/150" alt="${name}">`;
    item.innerHTML = `
        ${imageHtml}
        <span>${name}<br>${price.toLocaleString()}원</span>
    `;
    item.addEventListener('dragstart', dragStartHandler);
    menuContainer.appendChild(item);
}

// 드래그 시작 이벤트
function dragStartHandler(e) {
    const menuItem = e.currentTarget;
    e.dataTransfer.setData('text/plain', JSON.stringify({
        name: menuItem.dataset.name,
        price: parseInt(menuItem.dataset.price, 10),
        isFromMenu: menuItem.classList.contains('menu-item') // 메뉴에서 시작 여부 확인
    }));
}

// 드래그 앤 드롭 이벤트 등록
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('dragstart', dragStartHandler);
});

// 장바구니에 드롭
cartElement.addEventListener('dragover', (e) => {
    e.preventDefault();
    cartElement.classList.add('dragover');
});

cartElement.addEventListener('dragleave', () => {
    cartElement.classList.remove('dragover');
});

// 장바구니에 드롭
cartElement.addEventListener('drop', (e) => {
    e.preventDefault();
    cartElement.classList.remove('dragover');
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { name, price, isFromMenu } = data;

    if (isFromMenu) {
        if (!cart[name]) {
            cart[name] = { price, quantity: 1 };
        } else {
            cart[name].quantity += 1;
        }

        // 메뉴 아이템 숨기기
        const menuItem = document.querySelector(`.menu-item[data-name="${name}"]`);
        if (menuItem) {
            hiddenMenuItems[name] = menuItem; // 숨긴 메뉴 저장
            menuItem.style.display = 'none'; // 메뉴 숨김
        }
    }
    updateCart();
});

// 메뉴로 드롭하여 복구
menuContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    menuContainer.classList.remove('dragover');

    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { name, isFromMenu } = data;

    if (!isFromMenu && cart[name]) {
        // 장바구니에서 아이템 제거
        delete cart[name];
        updateCart();

        // 숨긴 메뉴 복구
        if (hiddenMenuItems[name]) {
            const menuItem = hiddenMenuItems[name];
            menuItem.style.display = 'flex'; // 메뉴 다시 표시
            delete hiddenMenuItems[name]; // 복구된 메뉴는 hiddenMenuItems에서 제거
        }
    }
});

// 드래그 앤 드롭 상태 시각적 피드백
cartElement.addEventListener('dragover', (e) => {
    e.preventDefault();
    cartElement.classList.add('dragover');
});
cartElement.addEventListener('dragleave', () => {
    cartElement.classList.remove('dragover');
});
menuContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    menuContainer.classList.add('dragover');
});
menuContainer.addEventListener('dragleave', () => {
    menuContainer.classList.remove('dragover');
});

menuContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    menuContainer.classList.remove('dragover');
    
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { name, isFromMenu } = data;

    // 메뉴판에서 메뉴판으로 드래그 앤 드롭한 경우 처리하지 않음
    if (isFromMenu) {
        return;
    }

    // 장바구니에서 드래그된 경우만 처리
    if (cart[name]) {
        delete cart[name];
        updateCart(); // 장바구니 업데이트
    }
});


// 관리자 모드 활성화
adminButton.addEventListener('click', () => {
    const password = prompt('관리자 비밀번호를 입력하세요:');
    if (password === 'admin') {
        adminPanel.style.display = 'block';
    } else {
        alert('비밀번호가 틀렸습니다.');
    }
});

// 새 메뉴 추가
newItemImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('addMenuItem').addEventListener('click', () => {
    const name = document.getElementById('newItemName').value.trim();
    const price = parseInt(document.getElementById('newItemPrice').value, 10);
    const category = document.getElementById('newItemCategory').value;
    const image = imagePreview.src !== '' ? imagePreview.src : null;

    if (name && price && category) {
        addMenuItem(name, price, category, image);
        alert(`${name}이(가) ${category} 카테고리에 추가되었습니다.`);
        document.getElementById('newItemName').value = '';
        document.getElementById('newItemPrice').value = '';
        document.getElementById('newItemCategory').value = 'beverages';
        newItemImage.value = '';
        imagePreview.style.display = 'none';
    } else {
        alert('이름, 가격, 카테고리를 정확히 입력하세요.');
    }
});

// 메뉴 삭제
document.getElementById('deleteMenuItem').addEventListener('click', () => {
    const name = document.getElementById('deleteItemName').value.trim();
    const items = Array.from(document.querySelectorAll('.menu-item'));
    const item = items.find(i => i.dataset.name === name);

    if (item) {
        item.remove();
        alert(`${name}이(가) 삭제되었습니다.`);
    } else {
        alert('해당 이름의 메뉴가 없습니다.');
    }
});

document.getElementById('cancelButton').addEventListener('click', () => {
        // 장바구니 비우기
        Object.keys(cart).forEach(key => {
            console.log(`장바구니에서 ${key} 제거`);
            delete cart[key];
        });

        // 숨겨진 메뉴 아이템 복구
        Object.keys(hiddenMenuItems).forEach(name => {
            const menuItem = hiddenMenuItems[name];
            if (menuItem) {
                console.log(`숨겨진 메뉴 ${name} 복구`);
                menuItem.style.display = 'flex';
                delete hiddenMenuItems[name];
            }
        });

        // 장바구니 UI 업데이트
        updateCart();
    
});


// 카테고리 필터
categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');

        const selectedCategory = category.dataset.category;
        document.querySelectorAll('.menu-item').forEach(item => {
            if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 관리자 모드 종료
document.getElementById('exitAdmin').addEventListener('click', () => {
    adminPanel.style.display = 'none';
});

// 기본 카테고리 선택
document.querySelector('.category-button[data-category="all"]').click();

document.getElementById('checkoutButton').addEventListener('click', () => {
    let total = 0;
    const items = [];

    // 장바구니 항목 순회 및 총합 계산
    for (const [name, { price, quantity }] of Object.entries(cart)) {
        total += price * quantity;
        items.push({ name, quantity, price }); // 항목 데이터 추가
    }

    if (items.length === 0 || total === 0) {
        alert('장바구니가 비어 있습니다.');
        return; // 빈 장바구니일 경우 함수 종료
    }

    const vat = Math.floor(total / 10); // 부가세 계산
    const totalPayment = total + vat;

    // 승인번호 및 승인 일시 생성
    const approvalNumber = Math.floor(Math.random() * 900000 + 100000); // 6자리 임의 승인번호
    const approvalDate = new Date().toLocaleString();

    // 판매 기록 저장 조건 강화
    const saleRecord = {
        date: approvalDate,
        total: totalPayment,
        items,
    };

    if (items.length > 0 && totalPayment > 0) {
        sales.history.push(saleRecord); // 정상 내역만 추가
    }

    // 판매 총액 업데이트
    sales.total += totalPayment;
    salesTotalDisplay.textContent = `${sales.total.toLocaleString()}원`;

    // 판매 내역 업데이트
    updateSalesHistory();

    // 영수증 데이터 설정
    const receiptItems = items.map(item => 
        `<p>${item.name} ${item.quantity}개: ${(item.price * item.quantity).toLocaleString()}원</p>`
    ).join('');

    document.getElementById('receiptItems').innerHTML = receiptItems;
    document.getElementById('subtotal').textContent = total.toLocaleString();
    document.getElementById('vat').textContent = vat.toLocaleString();
    document.getElementById('totalPayment').textContent = totalPayment.toLocaleString();
    document.getElementById('approvalNumber').textContent = approvalNumber; // 승인번호 설정
    document.getElementById('approvalDate').textContent = approvalDate; // 승인 일시 설정

    // 영수증 표시
    const receiptModal = document.getElementById('receiptModal');
    receiptModal.style.display = 'flex';

    // 장바구니 초기화 및 메뉴 복구
    Object.keys(cart).forEach((key) => delete cart[key]);
    Object.keys(hiddenMenuItems).forEach((name) => {
        const menuItem = hiddenMenuItems[name];
        if (menuItem) {
            menuItem.style.display = 'flex'; // 메뉴 복구
            delete hiddenMenuItems[name]; // 복구된 아이템 제거
        }
    });
    updateCart(); // 장바구니 UI 초기화
});

// 판매 내역 업데이트 함수 (빈 내역 방지)
function updateSalesHistory() {
    const salesHistoryDiv = document.getElementById('salesHistory');
    salesHistoryDiv.innerHTML = ''; // 기존 내용을 초기화

    if (sales.history.length === 0) {
        salesHistoryDiv.textContent = '판매 내역이 없습니다.';
        return;
    }

    sales.history.forEach((record, index) => {
        // 빈 내역 방지
        if (!record.items || record.items.length === 0 || record.total === 0) {
            return;
        }

        // 텍스트를 한 줄로 처리
        const recordText = `${index + 1}. ${record.date} | 총 금액: ${record.total.toLocaleString()}원 | 항목: ${record.items.map(item => `${item.name} x${item.quantity}`).join(', ')}`;

        // 텍스트를 한 줄로 표시
        const recordDiv = document.createElement('div');
        recordDiv.classList.add('sales-record');
        recordDiv.textContent = recordText; // 단순 텍스트로 설정

        salesHistoryDiv.appendChild(recordDiv);
    });
}




// 닫기 버튼 이벤트 핸들러
document.getElementById('closeReceipt').addEventListener('click', () => {
    const receiptModal = document.getElementById('receiptModal');
    receiptModal.style.display = 'none';
});


// 판매 내역 저장 구조 확장
sales.history = [];

// 판매 내역 초기화 기능
const resetSalesButton = document.createElement('button');
resetSalesButton.textContent = '판매 내역 초기화';
resetSalesButton.id = 'resetSales';
resetSalesButton.addEventListener('click', () => {
    if (confirm('모든 판매 내역을 초기화하시겠습니까?')) {
        sales.history = [];
        sales.total = 0;
        salesTotalDisplay.textContent = '0원';
        updateSalesHistory();
        alert('판매 내역이 초기화되었습니다.');
    }
});

// 관리자 모드에 초기화 버튼 추가
document.getElementById('adminPanel').appendChild(resetSalesButton);

// 초기 화면 판매 내역 업데이트
updateSalesHistory();


