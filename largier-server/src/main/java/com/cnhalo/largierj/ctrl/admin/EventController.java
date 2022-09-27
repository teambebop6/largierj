package com.cnhalo.largierj.ctrl.admin;

import com.cnhalo.largierj.dt.Event;
import com.cnhalo.largierj.dt.ImageSavedInfo;
import com.cnhalo.largierj.dt.Result;
import com.cnhalo.largierj.service.AdminService;
import com.cnhalo.largierj.service.FileUploadService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import javax.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Henry Huang on 2022/9/25.
 */
@RestController
@RequestMapping("/api/admin/events")
public class EventController {

    final
    AdminService adminService;

    final
    FileUploadService fileUploadService;

    public EventController(AdminService adminService, FileUploadService fileUploadService) {
        this.adminService = adminService;
        this.fileUploadService = fileUploadService;
    }

    @GetMapping("")
    public ResponseEntity<List<Event>> findAllEvents() {
        return ResponseEntity.ok(adminService.findAllEvents());
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Result<Event>> addEvent(@RequestBody Event event) throws JsonProcessingException {
        Event added = adminService.createConcert(event, null);
        return ResponseEntity.ok(Result.<Event>builder().ok(true).data(added).build());
    }

    @PostMapping(value = "/add2")
    public ResponseEntity<Result<Event>> addEventNew(@RequestParam(value = "file", required = false) MultipartFile file,
        @RequestParam("event") Event event) {
        ImageSavedInfo imageSavedInfo = file == null ?  null : fileUploadService.checkAndSaveImage(file);
        Event added = adminService.createConcert(event, imageSavedInfo);
        return ResponseEntity.ok(Result.<Event>builder().ok(true).data(added).build());
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<Result<Event>> findEvent(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(Result.<Event>builder().ok(true).data(adminService.findEvent(id)).build());
    }

    @PostMapping("/item/{id}")
    public ResponseEntity<Result<Event>> updateEvent(@PathVariable @NotNull Long id, @RequestBody Event event) {
        Event saved = adminService.updateConcert(id, event);
        return ResponseEntity.ok(Result.<Event>builder().ok(true).data(saved).build());
    }

    @PostMapping("/delete")
    public ResponseEntity<Result<Event>> deleteEvent(@RequestBody Event event) {
        adminService.getConcertRepository().deleteById(event.getId());
        return ResponseEntity.ok(Result.<Event>builder().ok(true).build());
    }

}
