package com.cnhalo.largierj.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Henry Huang on 2022/10/13.
 */
@Controller
public class IndexController {

    @RequestMapping(value = "/admin/{path}", method = RequestMethod.GET)
    public ModelAndView redirect(@PathVariable String path) {
        return new ModelAndView("redirect:/admin/" + path);
    }

    @GetMapping("/hc")
    @ResponseBody
    public String healthCheck() {
        return "ok";
    }

}
