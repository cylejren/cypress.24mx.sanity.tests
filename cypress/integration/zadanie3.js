/*
Sanity tests for 24mx domains
*/

const websites = [{
  domain: 'https://www.24mx.pl',
  cookie_button: 'OK!',
  contact_page: 'Biuro Obsługi Klienta'
}, {
  domain: 'https://www.24mx.ie',
  cookie_button: 'That\'s ok!',
  contact_page: 'Customer Service'
}]


describe('Sanity tests for 24mx domains', () => {
    websites.forEach((website) => {

      beforeEach(() => {
        cy.clearLocalStorage()
        cy.clearCookies()
        //cy.visit(website.domain)
        cy.viewport(1000, 660)
//        cy.get('p-consent')
//            .contains(website.cookie_button)
//            .click()
      })

          it('User is able to open website ${website.domain}',() => {
            cy.visit(website.domain)

            //hide popup
            cy.get('.NostoOverlayClose').click()
          })


          it('Cookie popup visible after opening site', () => {

            //check if Cookie popup is visible and close it
            cy.get('p-consent')
                .contains(website.cookie_button, { timeout: 10000 })
                .click()
          })


          it('User is able to search given product', () => {

            const search_txt = '24MX Hard Balls Shoe Deodorant'

            //type name of the product in search bar
            cy.get('#search-tablet')
                .type(search_txt)
                .type('{enter}')

            //check if search results are shown
            cy.get('.m-search-header__headline')
                .should('exist')
                .contains(search_txt)
          })


          it('User is able to add product to the cart', () => {

//            //select first product from search results
            cy.get('.a-product-title')
                .first()
                .click()


//            //add product to the cart
            cy.get('.m-button__default')
                .click()


//            //confirm and go to the cart
            cy.get('.o-cart-process__added > .a-textlink')
                .click()
            cy.get('p-checkout-cart').should('be.visible')
          })



          it('User can access Customer service page', () => {

            //select hamburger
            cy.get('.o-mobile-header__menu')
                .click()
            cy.get('.o-mobile-menu__icon-list')
                .click()

            //check header site
            cy.get('.logo').contains(website.contact_page)
          })


    })

})






