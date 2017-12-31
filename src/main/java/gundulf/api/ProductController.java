package gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
class ProductController {

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_PRODUCTS}")
    private String root;

    private String products = "/api/products";

    @GetMapping("/{producer}")
    ResponseEntity<String> listByProducer(@PathVariable String producer,
                                @RequestParam(value = "page", defaultValue = "0") int page,
                                @RequestParam(value = "size", defaultValue = "0") int size){

        return apiBouncer.get(root + products +"/"+ producer);

    }

    @PostMapping(value = "/{producer}")
    ResponseEntity<?> create(@PathVariable String producer,
                             @RequestBody String product) {

        return apiBouncer.post(root + products +"/"+ producer, product);

    }

    @DeleteMapping(value = "/{producer}/{id}")
    void delete(@PathVariable String producer,
                @PathVariable(required = true) Long id) {

        apiBouncer.delete(root + products +"/"+ producer +"/"+ id);
    }

}//:)
