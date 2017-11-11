package gundulf;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class BaseController {


    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @RequestMapping("/products")
    public String products() {
        return "chef.html";
    }

    @RequestMapping("/orders")
    public String orders() {
        return "shop.html";
    }
}