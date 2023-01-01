package com.cnhalo.largierj.service;

import com.cnhalo.largierj.dt.ImageSavedInfo;
import java.io.File;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Henry Huang on 2022/9/25.
 */
public interface FileUploadService {

    List<ImageSavedInfo> checkAndSaveImages(MultipartFile[] files);

    ImageSavedInfo checkAndSaveImage(MultipartFile file);

    File resolveUploadFile(String fileNameEncrypted);

    void cleanupUnusedFiles();

}
