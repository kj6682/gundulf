package org.kj6682.gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
class ProducerController {

    @Autowired
    ProductService productService;

    @Autowired
    OrderService orderService;

    @GetMapping("/products/{producer}")
    ResponseEntity<String> listByProducer(@PathVariable String producer) {

        return productService.listByProducer(producer);

    }

    @PostMapping(value = "/products/{producer}")
    ResponseEntity<?> createProduct(@PathVariable String producer,
                             @RequestBody String product) {

        return productService.create(producer, product);

    }

    @DeleteMapping(value = "/products/{producer}/{product}/{pieces}")
    void delete(@PathVariable(required = true) String producer,
                @PathVariable(required = true) String product,
                @PathVariable(required = true) Integer pieces) {

        productService.delete(producer, product, pieces);
    }

    @GetMapping("/orders/producer/{producer}")
    ResponseEntity<String> producerOrders(@PathVariable String producer) {

        return orderService.producerOrders(producer);

    }

    @GetMapping("/orders/producer/{producer}/todo")
    ResponseEntity<String> producerTodos(@PathVariable String producer) {

        return orderService.producerTodos(producer);

    }

    @GetMapping("/orders/shop/{shop}")
    ResponseEntity<String> shopOrders(@PathVariable String shop) {

        return orderService.shopOrders(shop);

    }

    @GetMapping("/orders/shop/{shop}/products/{producer}")
    ResponseEntity<String> dailyOrders(@PathVariable String shop,
                                       @PathVariable String producer) {

        return orderService.dailyOrders( shop, producer);
    }

    @PostMapping(value = "/orders/shop/{shop}")
    ResponseEntity<?> createOrder(@PathVariable String shop,
                                 @RequestBody String order) {

        return orderService.create(shop, order);

    }

    @PutMapping(value = "/orders/shop/{shop}/{id}")
    ResponseEntity<?> updateOrder(@PathVariable String shop,
                             @PathVariable String id,
                             @RequestBody String order) {

        return orderService.update(shop, id, order);

    }

    @DeleteMapping(value = "/orders/shop/{shop}/{id}")
    void deleteOrder(@PathVariable String shop,
                @PathVariable(required = true) Long id) {

        orderService.delete(shop, id);
    }
}//:)
