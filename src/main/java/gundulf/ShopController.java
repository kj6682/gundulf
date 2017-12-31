package gundulf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
class ShopController {

    @Value("${PROXY_ORDERS}")
    private String proxyOrders;

    @RequestMapping("/shop/{shop}")
    public String paris(@PathVariable String shop, Model model) {


        if(SHOP.LUXEMBOURG.toString().equals(shop.toUpperCase())){

            return getModel(SHOP.LUXEMBOURG, model);
        }

        if(SHOP.MILAN.toString().equals(shop.toUpperCase())){

            return getModel(SHOP.MILAN, model);
        }

        return getModel(SHOP.PARIS, model);
    }

    private String getModel(SHOP shop, Model model) {
        model.addAttribute("shop", shop.name);
        model.addAttribute("proxyOrders", proxyOrders);
        return "shop/index";
    }


    private enum SHOP {
        PARIS("paris"), LUXEMBOURG("luxembourg"), MILAN("milan");

        private String name;

        SHOP(String name) {
            this.name = name;
        }

        String getName() {
            return this.name;
        }
    }
}