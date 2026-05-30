# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Cart/cart.spec.js >> Cart Management Service - DemoBlaze >> CART_014 Verify cart table headers
- Location: tests/Cart/cart.spec.js:201:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.success')
Expected: visible
Error: strict mode violation: locator('.success') resolved to 3 elements:
    1) <tr class="success">…</tr> aka getByRole('row', { name: 'Samsung galaxy s6 360 Delete' }).first()
    2) <tr class="success">…</tr> aka getByRole('row', { name: 'Samsung galaxy s6 360 Delete' }).nth(1)
    ...

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.success')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:            
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "PRODUCT STORE" [ref=e4] [cursor=pointer]:
        - /url: index.html
        - img [ref=e5]
        - text: PRODUCT STORE
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home (current)" [ref=e9] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=e10]: (current)
        - listitem [ref=e11]:
          - link "Contact" [ref=e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e13]:
          - link "About us" [ref=e14] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e15]:
          - link "Cart" [ref=e16] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem [ref=e17]:
          - link "Log out" [ref=e18] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e19]:
          - link "Welcome Vyshnavi_26" [ref=e20] [cursor=pointer]:
            - /url: "#"
        - listitem
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "Products" [level=2] [ref=e24]
      - table [ref=e26]:
        - rowgroup [ref=e27]:
          - row "Pic Title Price x" [ref=e28]:
            - columnheader "Pic" [ref=e29]
            - columnheader "Title" [ref=e30]
            - columnheader "Price" [ref=e31]
            - columnheader "x" [ref=e32]
        - rowgroup [ref=e33]:
          - row "Samsung galaxy s6 360 Delete" [ref=e34]:
            - cell [ref=e35]:
              - img [ref=e36]
            - cell "Samsung galaxy s6" [ref=e37]
            - cell "360" [ref=e38]
            - cell "Delete" [ref=e39]:
              - link "Delete" [ref=e40] [cursor=pointer]:
                - /url: "#"
          - row "Samsung galaxy s6 360 Delete" [ref=e41]:
            - cell [ref=e42]:
              - img [ref=e43]
            - cell "Samsung galaxy s6" [ref=e44]
            - cell "360" [ref=e45]
            - cell "Delete" [ref=e46]:
              - link "Delete" [ref=e47] [cursor=pointer]:
                - /url: "#"
          - row "Samsung galaxy s6 360 Delete" [ref=e48]:
            - cell [ref=e49]:
              - img [ref=e50]
            - cell "Samsung galaxy s6" [ref=e51]
            - cell "360" [ref=e52]
            - cell "Delete" [ref=e53]:
              - link "Delete" [ref=e54] [cursor=pointer]:
                - /url: "#"
    - generic [ref=e55]:
      - heading "Total" [level=2] [ref=e56]
      - heading "1080" [level=3] [ref=e59]
      - button "Place Order" [ref=e60]
  - generic [ref=e62]:
    - generic [ref=e65]:
      - heading "About Us" [level=4] [ref=e66]
      - paragraph [ref=e67]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e70]:
      - heading "Get in Touch" [level=4] [ref=e71]
      - paragraph [ref=e72]: "Address: 2390 El Camino Real"
      - paragraph [ref=e73]: "Phone: +440 123456"
      - paragraph [ref=e74]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e78]:
      - img [ref=e79]
      - text: PRODUCT STORE
  - contentinfo [ref=e80]:
    - paragraph [ref=e81]: Copyright © Product Store
```

# Test source

```ts
  106 |             await cartPage.openFirstProduct();
  107 | 
  108 |             page.once('dialog', async dialog => {
  109 | 
  110 |                 await dialog.accept();
  111 |             });
  112 | 
  113 |             await cartPage.addProductToCart();
  114 |         }
  115 | 
  116 |         await cartPage.openCart();
  117 | 
  118 |         await expect(cartPage.cartItems.first())
  119 |             .toBeVisible();
  120 |     });
  121 | 
  122 |     test('CART_007 Verify cart total is displayed', async () => {
  123 | 
  124 |         await cartPage.openCart();
  125 | 
  126 |         await expect(cartPage.totalAmount)
  127 |             .toBeVisible();
  128 |     });
  129 | 
  130 |     test('CART_008 Verify product can be deleted from cart', async () => {
  131 | 
  132 |         await cartPage.openCart();
  133 | 
  134 |         if (await cartPage.deleteLink.first().isVisible()) {
  135 | 
  136 |             await cartPage.deleteProduct();
  137 |         }
  138 |     });
  139 | 
  140 |     test('CART_009 Verify deleted product is removed', async ({ page }) => {
  141 | 
  142 |         await cartPage.openCart();
  143 | 
  144 |         const initialCount =
  145 |             await cartPage.cartItems.count();
  146 | 
  147 |         if (initialCount > 0) {
  148 | 
  149 |             await cartPage.deleteProduct();
  150 | 
  151 |             await page.waitForTimeout(2000);
  152 | 
  153 |             await expect(cartPage.cartItems)
  154 |                 .toHaveCount(initialCount - 1);
  155 |         }
  156 |     });
  157 | 
  158 |     test('CART_010 Verify cart persists after refresh', async ({ page }) => {
  159 | 
  160 |         await cartPage.openCart();
  161 | 
  162 |         await page.reload();
  163 | 
  164 |         await expect(cartPage.cartItems.first())
  165 |             .toBeVisible();
  166 |     });
  167 | 
  168 |     test('CART_011 Verify navigation from product page to cart', async ({ page }) => {
  169 | 
  170 |         await cartPage.openFirstProduct();
  171 | 
  172 |         await cartPage.openCart();
  173 | 
  174 |         await expect(page)
  175 |             .toHaveURL(/cart.html/);
  176 |     });
  177 | 
  178 |     test('CART_012 Verify duplicate product addition', async ({ page }) => {
  179 | 
  180 |         await cartPage.openFirstProduct();
  181 | 
  182 |         for (let i = 0; i < 2; i++) {
  183 | 
  184 |             page.once('dialog', async dialog => {
  185 | 
  186 |                 await dialog.accept();
  187 |             });
  188 | 
  189 |             await cartPage.addProductToCart();
  190 |         }
  191 |     });
  192 | 
  193 |     test('CART_013 Verify cart page URL', async ({ page }) => {
  194 | 
  195 |         await cartPage.openCart();
  196 | 
  197 |         expect(page.url())
  198 |             .toContain('cart.html');
  199 |     });
  200 | 
  201 |     test('CART_014 Verify cart table headers', async () => {
  202 | 
  203 |         await cartPage.openCart();
  204 | 
  205 |         await expect(cartPage.tableHeader)
> 206 |             .toBeVisible();
      |              ^ Error: expect(locator).toBeVisible() failed
  207 |     });
  208 | 
  209 |     test('CART_015 Verify cart loads successfully after login', async () => {
  210 | 
  211 |         await cartPage.openCart();
  212 | 
  213 |         await expect(cartPage.cartItems.first())
  214 |             .toBeVisible();
  215 |     });
  216 | });
```