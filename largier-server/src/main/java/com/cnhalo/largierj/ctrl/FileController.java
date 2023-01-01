package com.cnhalo.largierj.ctrl;

import com.cnhalo.largierj.service.FileUploadServiceImpl;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Henry Huang on 2022/9/25.
 */
@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    FileUploadServiceImpl imageUploadService;

    @GetMapping("/image/{id}")
    public ResponseEntity<InputStreamResource> downloadImage(@PathVariable String id) throws IOException {
        File file = imageUploadService.resolveUploadFile(id);
        String contentTypeString = Files.probeContentType(file.toPath());
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentTypeString))
            .body(new InputStreamResource(new FileInputStream(file)));
    }
}
