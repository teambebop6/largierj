package com.cnhalo.largierj.service;

import com.cnhalo.largierj.config.UploadConfig;
import com.cnhalo.largierj.dt.ImageSavedInfo;
import com.cnhalo.largierj.model.Concert;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.imageio.ImageIO;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Henry Huang on 2022/9/25.
 */
@Service
@Slf4j
public class FileUploadServiceImpl implements FileUploadService {

    @Autowired
    private UploadConfig uploadConfig;

    @Autowired
    private AdminService adminService;

    /**
     * Check and save images
     *
     * @param files Raw files uploaded
     * @return List of file uris
     */
    @Override
    public List<ImageSavedInfo> checkAndSaveImages(MultipartFile[] files) {
        return Arrays.stream(files).map(this::checkAndSaveImage).collect(Collectors.toList());
    }

    @Override
    public ImageSavedInfo checkAndSaveImage(MultipartFile file) {
        if (!isImageFile(file)) {
            throw new RuntimeException("Only support image file");
        }
        String fileName = UUID.randomUUID() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        File uploadFolder = new File(uploadConfig.getLocation());
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }
        ImageSavedInfo imageSavedInfo = new ImageSavedInfo();
        try {
            IOUtils.copy(file.getInputStream(), new FileOutputStream(Paths.get(uploadConfig.getLocation(), fileName).toFile()));
            BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
            imageSavedInfo.setAvatar(Base64.getEncoder().encodeToString(fileName.getBytes()));
            imageSavedInfo.setWidth(bufferedImage.getWidth());
            imageSavedInfo.setHeight(bufferedImage.getHeight());
        } catch (IOException e) {
            log.error("Save file failed", e);
            throw new RuntimeException("Save file failed");
        }
        return imageSavedInfo;
    }

    @Override
    public File resolveUploadFile(String fileNameEncrypted) {
        String fileName = new String(Base64.getDecoder().decode(fileNameEncrypted.getBytes()));
        Path path = Paths.get(uploadConfig.getLocation(), fileName);
        File file = path.toFile();
        if (!file.exists()) {
            throw new RuntimeException("File not found");
        }
        return file;
    }

    @Override
    public void cleanupUnusedFiles() {
        List<Concert> concerts = adminService.getConcertRepository().findAllByAvatarIsNotNull();
        List<String> avatars = concerts.stream().map(Concert::getAvatar).collect(Collectors.toList());
        Path path = Paths.get(uploadConfig.getLocation());
        File[] files = path.toFile().listFiles();
        if (files != null) {
            List<String> fileNamesDefault = uploadConfig.getDefaultImageSavedInfos().stream().map(ImageSavedInfo::getAvatar).collect(
                Collectors.toList());
            for (File file : files) {
                String fileName = file.getName();
                String fileNameEncoded = Base64.getEncoder().encodeToString(fileName.getBytes());
                // TODO do not delete default images
                if (!fileNamesDefault.contains(fileNameEncoded) && !avatars.contains(fileNameEncoded)) {
                    file.delete();
                    log.info("Deleted " + fileName);
                }
            }
        }
    }

    private static boolean isImageFile(MultipartFile file) {
        return Objects.requireNonNull(file.getContentType()).startsWith("image");
    }

}
