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

    @GetMapping("/products/{producer}")
    ResponseEntity<String> listByProducer(@PathVariable String producer,
                                @RequestParam(value = "page", defaultValue = "0") int page,
                                @RequestParam(value = "size", defaultValue = "0") int size){

        return apiBouncer.get(products +"/"+ producer);

    }

    @GetMapping("/products/{producer}/search")
    ResponseEntity<String>  search(@PathVariable(required = true) String producer,
                                   @RequestParam(value = "name", defaultValue = "") String name) {

        return apiBouncer.get(products +"/"+ producer +"/search?name=" + name);
    }

    @PostMapping(value = "/products/{producer}")
    ResponseEntity<?> create(@PathVariable String producer,
                             @RequestBody String product) {

        return apiBouncer.post(products +"/"+ producer, product);

    }

    @DeleteMapping(value = "/products/{producer}/{id}")
    void delete(@PathVariable String producer,
                @PathVariable(required = true) Long id) {

        apiBouncer.delete(products +"/"+ producer +"/"+ id);
    }

}//:)
