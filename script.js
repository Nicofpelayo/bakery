let productData = [
  {
    name: "Carrot Cake",
    description:
      "Un bizcocho húmedo y especiado, preparado con zanahorias frescas que aportan dulzura natural y textura, complementado con un toque de canela. Coronado con un cremoso frosting de queso y decorado con nueces, esta torta equilibra sabores terrosos y dulces en cada bocado.",
    amount: 3,
    price: 1000,
  },
  {
    name: "Cheese Cake",
    description:
      "Un postre elaborado con una base crujiente de galleta dorada, combinada con un relleno suave y cremoso de queso fresco. Su textura sedosa y su delicado equilibrio entre dulzura y acidez destacan cada ingrediente en su máxima expresión.",
    amount: 4,
    price: 2000,
  },
  {
    name: "Torta de Chocolate",
    description:
      "Un bizcocho intenso y húmedo con el sabor profundo del mejor chocolate, acompañado de una cobertura brillante que realza su riqueza. Ideal para los amantes del chocolate en su forma más indulgente.",
    amount: 3,
    price: 1500,
  },
  {
    name: "Chocotorta",
    description:
      "Capas alternadas de galletitas de chocolate y un suave relleno de crema y dulce de leche, que se funden para crear una textura irresistible. Este clásico argentino es perfecto para quienes buscan un postre sencillo pero lleno de sabor.",
    amount: 3,
    price: 1200,
  },
  {
    name: "Torta de Corazon",
    description:
      "Un bizcochuelo ligero y esponjoso moldeado en forma de corazón, cubierto con un glaseado suave y brillante de color rosa. Perfecto para celebraciones especiales o como un detalle dulce y romántico.",
    amount: 3,
    price: 2300,
  },
  {
    name: "Lemon Pie",
    description:
      "Una base de masa crocante rellena con una crema suave y cítrica de limón, cubierta con un merengue tostado que aporta un toque dulce y aireado. Una combinación perfecta de frescura y textura.",
    amount: 3,
    price: 1987,
  },
  {
    name: "Mousse",
    description:
      "Una mousse suave y esponjosa, elaborada con chocolate de alta calidad para ofrecer un equilibrio perfecto entre dulzura y profundidad. Cada bocado se derrite en la boca, proporcionando una experiencia de sabor única.",
    amount: 3,
    price: 1345,
  },
  {
    name: "Red Velvet",
    description:
      "Un bizcocho aterciopelado y de color rojo vibrante, con un sutil toque de cacao, cubierto con un frosting cremoso de queso. Una torta elegante y distintiva, ideal para cualquier ocasión especial.",
    amount: 3,
    price: 2006,
  },
];

const alterDescription = (element) => {
  let descripcion = element.getElementsByClassName("product-card-description");
  console.log(descripcion);
  if (descripcion.length === 0) {
    const products = getProducts();
    const name = element.getElementsByTagName("a")[0].innerText;
    const product = products.find((item) => item.name === name);
    descripcion = document.createElement("div");
    const text = document.createTextNode(product.description);
    descripcion.className = "product-card-description";
    descripcion.appendChild(text);
    element.appendChild(descripcion);
  } else {
    descripcion[0].remove();
  }
};

const getProducts = () => {
  const products = [];
  for (i = 0; i < productData.length; i++) {
    products.push({ id: i + 1, ...productData[i] });
  }
  console.log(JSON.stringify(products));
  return products;
};

const addToCart = (element) => {
  const products = getProducts();
  const name = element.getElementsByTagName("a")[0].innerText;
  let cartProducts = JSON.parse(localStorage.getItem("carrito")) || [];
  const productInCart = cartProducts.find((item) => item.name === name);
  if (productInCart === undefined) {
    const product = products.find((item) => item.name === name);
    const newProduct = { ...product, amount: 1 };
    cartProducts.push(newProduct);
  } else {
    cartProducts = cartProducts.filter((producto) => {
      return producto.id !== productInCart.id;
    });
    cartProducts.push({ ...productInCart, amount: productInCart.amount + 1 });
  }
  console.log(JSON.stringify(cartProducts));
  localStorage.setItem("carrito", JSON.stringify(cartProducts));
  updateCart();
  if (!document.querySelector("#shopping-cart.visible")) {
    toggleCart();
  }
};

const clearCart = () => {
  localStorage.removeItem("carrito");
  updateCart();
};

const updateCart = () => {
  const listaCarrito = document.getElementById("cart-items");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Actualizar lista de productos
  listaCarrito.innerHTML = "";
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price * item.amount} - ${
      item.amount
    } u.`;
    listaCarrito.appendChild(li);
  });
};

function toggleCart() {
  const cart = document.getElementById("shopping-cart");
  cart.classList.toggle("visible");
}

let productCards = document.querySelectorAll(".product-card");
productCards.forEach((element) => {
  const moreInfo = document.createElement("button");
  const add = document.createElement("button");
  moreInfo.className = "product-card-info";
  add.className = "product-card-cart";
  moreInfo.onclick = () => {
    alterDescription(element);
  };
  add.onclick = () => {
    addToCart(element);
  };
  element.appendChild(moreInfo);
  element.appendChild(add);
});
updateCart();
