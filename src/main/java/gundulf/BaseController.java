package gundulf;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class BaseController {


    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @RequestMapping("/four")
    public String oven() {
        return "four/chef.html";
    }

    @RequestMapping("/entremets")
    public String dessert() {
        return "entremets/chef.html";
    }

    @RequestMapping("/tartes")
    public String cakes() {
        return "tartes/chef.html";
    }

    @RequestMapping("/chocolat")
    public String chocolat() {
        return "chocolat/chef.html";
    }

    @RequestMapping("/orders")
    public String orders() {
        return "shop.html";
    }
}