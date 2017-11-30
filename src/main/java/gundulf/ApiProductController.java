package gundulf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
class ApiProductController {

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_PRODUCTS}")
    private String products;


    @GetMapping("/products")
    ResponseEntity<String> list(@RequestParam(value = "page", defaultValue = "0") int page,
                                @RequestParam(value = "size", defaultValue = "0") int size){

        return apiBouncer.get(products);

    }

    @GetMapping("/products/search")
    ResponseEntity<String>  search(@RequestParam(value = "name", defaultValue = "") String name) {

        return apiBouncer.get(products + "/search?name=" + name);
    }

    @PostMapping(value = "/products")
    ResponseEntity<?> create(@RequestBody String product) {

        return apiBouncer.post(products, product);

    }


    @DeleteMapping(value = "/products/{id}")
    void delete(@PathVariable(required = true) Long id) {

        apiBouncer.delete(products + "/" + id);
    }

    @GetMapping("/products/{producer}")
    ResponseEntity<String> listByProducer(@PathVariable String producer,
                                @RequestParam(value = "page", defaultValue = "0") int page,
                                @RequestParam(value = "size", defaultValue = "0") int size){

        return apiBouncer.get(products+"/" + producer);

    }

}//:)
