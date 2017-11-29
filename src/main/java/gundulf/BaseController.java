package gundulf;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
class BaseController {



    @RequestMapping("/")
    public String main(@RequestParam(value="name", required=false, defaultValue="") String name, Model model) {
        model.addAttribute("name", name);
        return "chef";
    }

    @RequestMapping("/four")
    public String oven(@RequestParam(value="name", required=false, defaultValue="Four") String name, Model model) {
        model.addAttribute("name", name);
        return "chef";
    }

    @RequestMapping("/entremets")
    public String dessert(@RequestParam(value="name", required=false, defaultValue="Entremets") String name, Model model) {
        model.addAttribute("name", name);
        return "chef";
    }
    @RequestMapping("/tartes")
    public String cakes(@RequestParam(value="name", required=false, defaultValue="Tartes") String name, Model model) {
        model.addAttribute("name", name);
        return "chef";
    }

    @RequestMapping("/chocolat")
    public String chocolat(@RequestParam(value="name", required=false, defaultValue="Chocolat") String name, Model model) {
        model.addAttribute("name", name);
        return "chef";
    }

    @RequestMapping("/orders")
    public String orders() {
        return "shop.html";
    }
}