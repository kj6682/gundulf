package org.kj6682.gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class ProductService {

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_PRODUCTS}")
    private String products;


    ResponseEntity<String> listByProducer(String producer) {

        return apiBouncer.get(products + "/" + producer);

    }

    ResponseEntity<?> create(String producer,
                             String product) {

        return apiBouncer.post(products + "/" + producer, product);

    }

    void delete(String producer,
                String product,
                Integer pieces) {

        apiBouncer.delete(products +"/"+ producer +"/"+ product +"/"+ pieces);
    }
}
