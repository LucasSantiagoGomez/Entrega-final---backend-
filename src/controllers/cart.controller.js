import { cartsService, ticketService } from "../services/index.js"


export async function getCartById(req, res) {
	const cartId = req.params.cid;
	const result = await cartsService.getCartById(cartId);
	return res.send({ status: "Success", result });
};

  export async function addCart(req, res) {
	const result = await cartsService.addCart();
	return res.send({ status: "Success", result });
}

export async function getCarts(req, res) {
	const result = await cartsService.getCarts();
	return res.send({ status: "Success", result });
}
export const deleteCart = async (req, res) => {
	try {
	  const { cid } = req.params
  
	  if (!cid) {
		return res.status(400).send({
		  status: 'error',
		  error: 'Incomplete values'
		})
	  }
  
	  const deletedCart = await cartService.deleteCart(cid)
  
	  if (!deletedCart) {
		return res.status(404).send({
		  status: 'error',
		  error: 'Cart not found'
		})
	  }
  
	  return res.status(200).send({
		status: 'success',
		payload: deletedCart
	  })
	} catch (error) {
	  req.logger.error(`Cannot delete cart with mongoose ${error}`)
	  return res
		.status(500)
		.send({ status: 'error', error: 'Failed to delete cart' })
	}
  }


export async function addProduct(req, res) {
	const product = req.body;
	const files = req.files.splice(0, 4);

	if (!product) {
		return res.status(400).send({
			status: "Error",
			error: "Error, the product could no be added",
		});
	}

	const result = await productsService.addProduct(product, files);
	const response = {
		ok: true,
		status: "Added",
		message: "Product added",
		result,
	};
	return res.send(response);

}

export const addProducts = async (req, res) => {
	try {
	  const cartId = req.params.cid;
	  const products = req.body;
  
	  const updatedCart = await cartsService.addProducts(cartId, products);
	  if (!updatedCart)
		return res.status(400).send({ status: "error", error: "error" });
  
	  return res.send({ status: "sucess", message: "cart updated" });
	} catch (error) {
	  console.log(error);
	}
  };

  export const deleteProduct = async (req, res) => {
	try {
	  const cartId = req.params.cid;
	  const productId = req.params.pid;
  
	  const updatedCart = await cartsService.deleteProduct(cartId, productId);
  
	  if (!updatedCart)
		return res
		  .send(404)
		  .send({ status: "error", error: "product was not found" });
  
	  return res.send({ status: "sucess", message: "product deleted from cart" });
	} catch (error) {
	  console.log(error);
	}
  };
  
  export const deleteProducts = async (req, res) => {
	try {
	  const cartId = req.params.cid;
  
	  const updatedCart = await cartsService.deleteAllProducts(cartId);
  
	  if (!updatedCart)
		return res.status(404).send({ status: "error", error: "cart not found" });
  
	  return res.send({
		status: "sucess",
		message: "deleted all products from cart",
	  });
	} catch (error) {
	  console.log(error);
	}
  };


  export const updateProductQuantity = async (req, res) => {
	try {
	  const cartId = req.params.cid;
	  const productId = req.params.pid;
	  const { quantity } = req.body;
  
	  const updatedCart = await cartsService.updateProductQuantity(
		cartId,
		productId,
		quantity
	  );
  
	  if (!updatedCart)
		return res.status(400).send({ status: "error", error: "error" });
  
	  return res.send({ status: "sucess", message: "cart updated" });
	} catch (error) {
	  console.log(error);
	}

  };



  export const createTicket = async (req, res) => {
	try {
	  const { cid } = req.params
  
	  if (!cid) {
		return res.status(400).send({
		  status: 'error',
		  error: 'Incomplete values'
		})
	  }
  
	  const newTicket = await ticketService.createTicket(cid)
  
	  if (!newTicket) {
		return res.status(404).send({
		  status: 'error',
		  error: 'Failed to create ticket'
		})
	  }
  
	  res.status(201).send({ status: 'success', payload: newTicket })
	} catch (error) {
	  req.logger.error(`Failed to create ticket with mongoose ${error}`)
	  return res
		.status(500)
		.send({ status: 'error', error: 'Failed to create ticket' })
	}
  }

  export const createCart = async (req, res) => {
	try {
	  const newCart = await cartService.createCart()
  
	  if (!newCart) {
		return res.status(404).send({
		  status: 'error',
		  error: 'Failed to create cart'
		})
	  }
  
	  res.status(201).send({ status: 'success', payload: newCart })
	} catch (error) {
	  req.logger.error(`Failed to create cart with mongoose ${error}`)
	  return res
		.status(500)
		.send({ status: 'error', error: 'Failed to create cart' })
	}
  }
  
  