package com.cnhalo.largierj;

import com.cnhalo.largierj.model.Concert;
import com.cnhalo.largierj.service.AdminService;
import com.cnhalo.largierj.service.FileUploadService;
import com.github.javafaker.Faker;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import javax.imageio.ImageIO;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * Created by Henry Huang on 2022/9/26.
 */
@Slf4j
@EnableScheduling
@Configuration
public class ScheduledTasks {

    private final FileUploadService fileUploadService;
    private final AdminService adminService;

    public ScheduledTasks(FileUploadService fileUploadService, AdminService adminService) {
        this.fileUploadService = fileUploadService;
        this.adminService = adminService;
    }

//    @PostConstruct
    private void cleanupUnusedFilesOnStartup() throws IOException {
        cleanupUnusedFiles();
    }

//    @PostConstruct
    private void insertTestData() throws IOException {
// add test data
        String[] imageFileNames = new String[]{
            "MTJhYTlhNDItODlkMS00MjFhLWIzYWYtYjRmODE4NWNjNThlLmpwZw==",
            "Y2YyMjhhNjctZDhjMy00NzA5LThjMzMtZDIwNDY3MWMwNzY1LmpwZw==",
            "MzlmYTJlNDUtM2ExZS00MGE5LTg3Y2EtN2UyYzViZDgxYjYyLmpwZw==",
            "MDQxY2ZkNjMtNDI5Zi00Y2JkLThhNDEtN2Y2MDJlZGJmZmUwLmpwZw==",
            "NjZlZmI3MjQtNTRlMi00OGRmLThjYWMtZWNiNjg4MzVkY2VjLmpwZw==",
            "MjJjNDgzOWQtNDJkOS00ZTliLWFhNDMtYjc4NzMzNjVjNjI5LmpwZw==",
            "OTIyYjg1MjEtNDI1OC00NTJlLTkyMDQtMGE4YTZhNzcyOTM3LmpwZw==",
            "ZWZhNmEyNDQtZmE0NC00MGJmLTg3ZDktMjE1MGIxMGM0ODIyLmpwZw==",
            "OTBlYzc4NzgtNmM3NS00NjUyLWIwZjUtNzRkZDczMjQyODFkLmpwZw==",
            "MTQ0ZmFlMjgtNzczZi00ZGQ3LWFiOGUtYmRlNGZhNjFhNmU3LmpwZw==",
            "NDM3OWFlNWQtODYwNi00MzE4LThhOGEtYzE0MWI1ZWJiYzhkLmpwZw==",
            "ODdjYTFiZTQtYWEwNy00ZDE5LTgxMTQtZmU5NzA4MmVhNzExLmpwZw==",
            "NzFkNGRjNWUtODAzMi00MWE3LThmMWItZTc1YjIzODU2OTllLmpwZw==",
            "ODI1N2QzNGYtYTY4Ny00MDljLWE3MGUtMGIwMjMzMTZmYjMxLmpwZw=="
        };

        int num = 24;
        Faker faker = new Faker();
        Calendar calendar = Calendar.getInstance();
        calendar.set(2022, 1, 1);
        for (int i = 0; i < num; i++) {
            Concert concert = new Concert();
            concert.setTitle(faker.book().title());
            concert.setType("concert");
            calendar.add(Calendar.DAY_OF_MONTH, 15);
            concert.setDate(calendar.getTime());
            concert.setVisible(RandomUtils.nextBoolean());
            concert.setVenue(faker.university().name());
            String fileNameEncrypted = imageFileNames[RandomUtils.nextInt(0, 14)];
            File imageFile = fileUploadService.resolveUploadFile(fileNameEncrypted);
            BufferedImage bufferedImage = ImageIO.read(imageFile);
            concert.setAvatar(fileNameEncrypted);
            concert.setAvatarWidth(bufferedImage.getWidth());
            concert.setAvatarHeight(bufferedImage.getHeight());
            concert.setLink(faker.internet().image());
            concert.setLocation(faker.address().cityName());
            adminService.getConcertRepository().save(concert);
        }
    }

    @Scheduled(cron = "0 14 * * * *")
    public void cleanupUnusedFiles() {
        log.info("Start cleanup unused files task");
        fileUploadService.cleanupUnusedFiles();
        log.info("Finished cleanup unused files task");
    }

}
