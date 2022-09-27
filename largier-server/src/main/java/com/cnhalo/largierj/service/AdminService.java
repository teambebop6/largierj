package com.cnhalo.largierj.service;

import static com.cnhalo.largierj.constant.ConfigConstant.EVENT_TYPE_CONCERT;

import com.cnhalo.largierj.config.UploadConfig;
import com.cnhalo.largierj.constant.ConfigConstant;
import com.cnhalo.largierj.dt.ConfigItem;
import com.cnhalo.largierj.dt.Event;
import com.cnhalo.largierj.dt.ImageSavedInfo;
import com.cnhalo.largierj.model.Concert;
import com.cnhalo.largierj.model.Configuration;
import com.cnhalo.largierj.model.ConfigurationItem;
import com.cnhalo.largierj.repository.ConcertRepository;
import com.cnhalo.largierj.repository.ConfigurationRepository;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Service
public class AdminService {

    private static final String IMG_URI_PREFIX = "/file/image/";

    @Autowired
    private UploadConfig uploadConfig;

    @Autowired
    ConfigurationRepository configurationRepository;

    @Autowired
    ConcertRepository concertRepository;

    public List<Configuration> findAllConfigurations() {
        return configurationRepository.findAll();
    }

    public Event findEvent(Long id) {
        Optional<Concert> result = concertRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException();
        }
        return toEvent(result.get());
    }

    public List<Event> findAllEvents() {
        return toEvents(concertRepository.findAllByOrderByVisibleDescDateAsc());
    }

    public List<ConfigItem> updateConfigurationItems(ArrayList<ConfigItem> items) {
        List<Configuration> configurations = configurationRepository.findByGroupName(ConfigConstant.GROUP_NAME_GLOBAL);
        if (CollectionUtils.isEmpty(configurations)) {
            throw new ResourceNotFoundException();
        }

        Configuration configuration = configurations.get(0);
        configuration.setItems(items.stream().map(item -> {
            ConfigurationItem ci = new ConfigurationItem();
            ci.setConfigValue(item.getValue());
            ci.setName(item.getName());
            ci.setTitle(item.getTitle());
            ci.setId(item.getId());
            ci.setConfiguration(configuration);
            return ci;
        }).collect(Collectors.toList()));
        Configuration configUpdated = configurationRepository.saveAndFlush(configuration);

        return configUpdated.getItems().stream().map(i ->
            ConfigItem
                .builder()
                .value(i.getConfigValue())
                .id(i.getId())
                .name(i.getName())
                .title(i.getTitle())
                .build()
        ).collect(Collectors.toList());
    }

    public Event createConcert(Event event, ImageSavedInfo imageSavedInfo) {
        Concert concert = toConcert(event);
        if (imageSavedInfo != null) {
            concert.setAvatar(imageSavedInfo.getAvatar());
            concert.setAvatarWidth(imageSavedInfo.getWidth());
            concert.setAvatarHeight(imageSavedInfo.getHeight());
        }
        concert.setType(EVENT_TYPE_CONCERT);
        return toEvent(concertRepository.save(concert));
    }

    public Event updateConcert(Long id, Event toUpdated) {
        Concert old = concertRepository.findById(id).get();
        if (StringUtils.isNotBlank(toUpdated.getTitle())) {
            old.setTitle(toUpdated.getTitle());
        }
        if (StringUtils.isNotBlank(toUpdated.getLocation())) {
            old.setLocation(toUpdated.getLocation());
        }
        if (StringUtils.isNotBlank(toUpdated.getVenue())) {
            old.setVenue(toUpdated.getVenue());
        }
        if (toUpdated.getDate() != null) {
            old.setDate(toUpdated.getDate());
        }
        if (StringUtils.isNotBlank(toUpdated.getLink())) {
            old.setLink(toUpdated.getLink());
        }
        old.setVisible(toUpdated.getVisible());
        old.setLastModifiedDate(new Date());
        return toEvent(concertRepository.save(old));
    }

    public ConcertRepository getConcertRepository() {
        return concertRepository;
    }

    public ConfigurationRepository getConfigurationRepository() {
        return configurationRepository;
    }

    public List<Event> toEvents(List<Concert> concerts) {
        if (concerts == null) {
            return null;
        }
        return concerts.stream().map(this::toEvent).collect(Collectors.toList());
    }

    public Event toEvent(Concert concert) {
        Event event = new Event();
        event.setId(concert.getId());
        event.setTitle(concert.getTitle());
        event.setLocation(concert.getLocation());
        event.setVenue(concert.getVenue());
        event.setDate(concert.getDate());
        event.setLink(concert.getLink());
        if (StringUtils.isNotBlank(concert.getAvatar())) {
            event.setImageURI(IMG_URI_PREFIX + concert.getAvatar());
            event.setImageWidth(concert.getAvatarWidth());
            event.setImageHeight(concert.getAvatarHeight());
        } else {
            ImageSavedInfo imageSavedInfo = randomDefaultImageURI();
            event.setImageURI(IMG_URI_PREFIX + imageSavedInfo.getAvatar());
            event.setImageWidth(imageSavedInfo.getWidth());
            event.setImageHeight(imageSavedInfo.getHeight());
        }
        event.setType(concert.getType());
        event.setOrder(concert.getSortOrder());
        event.setVisible(concert.getVisible());
        event.setCreationDate(concert.getCreationDate());
        event.setLastModifiedDate(concert.getLastModifiedDate());
        return event;
    }

    public Concert toConcert(Event event) {
        Concert concert = new Concert();
        concert.setId(event.getId());
        concert.setTitle(event.getTitle());
        concert.setLocation(event.getLocation());
        concert.setVenue(event.getVenue());
        concert.setDate(event.getDate());
        concert.setLink(event.getLink());
        concert.setAvatar(FilenameUtils.getName(event.getImageURI()));
        concert.setAvatarWidth(event.getImageWidth());
        concert.setAvatarHeight(event.getImageHeight());
        concert.setType(event.getType());
        concert.setSortOrder(event.getOrder());
        concert.setVisible(event.getVisible());
        concert.setCreationDate(event.getCreationDate());
        concert.setLastModifiedDate(event.getLastModifiedDate());
        return concert;
    }

    private ImageSavedInfo randomDefaultImageURI() {
        return uploadConfig.getDefaultImageSavedInfos().get(RandomUtils.nextInt(0, uploadConfig.getDefaultImageSavedInfos().size()));
    }

    public static void main(String[] args) {
        System.out.println(Base64.getEncoder().encodeToString("default-avatar-1.jpg".getBytes()));
        System.out.println(Base64.getEncoder().encodeToString("default-avatar-2.jpg".getBytes()));
        System.out.println(Base64.getEncoder().encodeToString("default-avatar-3.jpg".getBytes()));
        System.out.println(Base64.getEncoder().encodeToString("default-avatar-4.jpg".getBytes()));
    }

}
