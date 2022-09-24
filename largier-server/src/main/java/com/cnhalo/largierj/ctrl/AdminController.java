package com.cnhalo.largierj.ctrl;

import com.cnhalo.largierj.constant.ConfigConstant;
import com.cnhalo.largierj.dt.ConfigItem;
import com.cnhalo.largierj.dt.Result;
import com.cnhalo.largierj.model.Concert;
import com.cnhalo.largierj.model.Configuration;
import com.cnhalo.largierj.service.AdminService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.print.attribute.standard.Media;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping({"/configurations"})
    public ResponseEntity<List<ConfigItem>> findGlobalConfig() {

        List<Configuration> configurations = adminService.getConfigurationRepository().findByGroupName(ConfigConstant.GROUP_NAME_GLOBAL);
        if (CollectionUtils.isEmpty(configurations)) {
            throw new ResourceNotFoundException();
        }

        Configuration configuration = configurations.get(0);
        return ResponseEntity.ok(configuration.getItems().stream().map(ConfigItem::convert).collect(Collectors.toList()));
    }

    @PostMapping(value = {"/configurations"})
    public ResponseEntity<List<ConfigItem>> updateGlobalConfig(@NotNull @RequestBody ArrayList<ConfigItem> items) {
        return ResponseEntity.ok(adminService.updateConfigurationItems(items));
    }

    @GetMapping("/events")
    public ResponseEntity<List<Concert>> findAllEvents() {
        return ResponseEntity.ok(adminService.findAllEvents());
    }

    @PostMapping(value = "/events/add")
    public ResponseEntity<Result> addEvent(@RequestBody Concert concert) throws JsonProcessingException {
        Concert added = adminService.createConcert(concert);
        return ResponseEntity.ok(Result.builder().ok(true).data(added).build());
    }

    @GetMapping("/events/item/{id}")
    public ResponseEntity<Result> findEvent(@PathVariable @NotNull Long id) {
        Optional<Concert> result = adminService.getConcertRepository().findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException();
        }
        Concert concert = result.get();
        return ResponseEntity.ok(Result.builder().ok(true).data(concert).build());
    }

    @PostMapping("/events/item/{id}")
    public ResponseEntity<Result> updateEvent(@PathVariable @NotNull Long id, @RequestBody Concert concert) {
        Concert saved = adminService.updateConcert(id, concert);
        return ResponseEntity.ok(Result.builder().ok(true).data(saved).build());
    }

    @PostMapping("/events/delete")
    public ResponseEntity<Result> deleteEvent(@RequestBody Concert concert) {
        adminService.getConcertRepository().deleteById(concert.getId());
        return ResponseEntity.ok(Result.builder().ok(true).build());
    }



}
