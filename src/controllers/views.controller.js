import { parse } from 'dotenv'
import {
  productService,
  cartService,
  messageService,
  ticketService,
  userService
} from '../services/index.js'

export const loginView = (req, res) => {
  res.render('login', {
    
  })
}

export const registerView = (req, res) => {
  res.render('register', {
   
  })
}

export const profileView = async (req, res) => {
  try {
    const { email } = req.user
    const user = await userService.getUser(email)
    const profilePicture = user.documents?.find((doc) => doc.name === 'profile')?.reference

    res.render('profile', {
      user: req.user,
      profilePicture,
      
    })
  } catch (error) {
    req.logger.error(`Failed to render profile view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render profile view' })
  }
}

export const restorePasswordView = (req, res) => {
  res.render('restore', {
   
  })
}

export const resetPasswordView = (req, res) => {
  res.render('resetPassword', {
   
  })
}

export const homeView = async (req, res) => {
  try {
    const { limit = 10, page = 1, category, available, sort } = req.query
    const {
      docs: products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage
    } = await productService.getProducts(
      page,
      limit,
      category,
      available,
      sort
    )
    res.render('home', {
      user: req.user,
      products,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
     
    })
  } catch (error) {
    req.logger.error(`Failed to render home view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render home view' })
  }
}

export const productView = async (req, res) => {
  try {
    const { pid } = req.params
    const product = await productService.getProductById(pid)

    if (!product) {
      return res.status(404).render('error', {
        message: 'Error 404: Product not found',
       
      })
    }
    res.render('product', {
      role: req.user.role,
      cartId: req.user.cart,
      product,
     
    })
  } catch (error) {
    req.logger.error(`Failed to render product view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render product view' })
  }
}

export const cartView = async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartService.getCartById(cid)
    res.render('cart', {
      cart,
   
    })

    if (!cart) {
      return res.status(404).render('error', {
        message: 'Error 404: Cart not found',
      
      })
    }
  } catch (error) {
    req.logger.error(`Failed to render cart view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render cart view' })
  }
}

export const ticketsView = async (req, res) => {
  try {
    const { email } = req.user
    const userTickets = await ticketService.getTicketsByEmail(email)
    userTickets.forEach((ticket) => {
      const date = new Date(ticket.purchase_datetime).toLocaleString()
      ticket.purchase_datetime = date
    })
    res.render('tickets', {
      user: req.user,
      userTickets,
      
    })

    if (!userTickets) {
      return res.status(404).render('error', {
        message: 'Error 404: Tickets not found',
       
      })
    }
  } catch (error) {
    req.logger.error(`Failed to render tickets view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render tickets view' })
  }
}

export const adminView = async (req, res) => {
  try {
    const users = await userService.getUsers()

    const parsedUsers = users.map((user) => {
      const parsedDate = new Date(user.last_connection)
      const parsedUser = { ...user }
      parsedUser.last_connection = parsedDate.toLocaleString()
      return parsedUser
    })

    res.render('admin', {
      parsedUsers,
    
    })
  } catch (error) {
    req.logger.error(`Failed to render admin view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render admin view' })
  }
}

export const realTimeProductsView = async (req, res) => {
  try {
    const { limit = 10, page = 1, category, available, sort } = req.query
    const {
      docs: products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage
    } = await productService.getProducts(
      page,
      limit,
      category,
      available,
      sort
    )

    res.render('realTimeProducts', {
      products,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
     
    })
  } catch (error) {
    req.logger.error(`Failed to render real time view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render real time view' })
  }
}

export const chatView = async (req, res) => {
  try {
    const messages = await messageService.getMessages()
    res.render('chat', {
      messages,
    
    })

    if (!messages) {
      return res.status(404).render('error', {
        message: 'Error 404: Messages not found',
        
      })
    }
  } catch (error) {
    req.logger.error(`Failed to render chat view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render chat view' })
  }
}