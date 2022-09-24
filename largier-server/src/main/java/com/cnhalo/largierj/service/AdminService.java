package com.cnhalo.largierj.service;

import static com.cnhalo.largierj.constant.ConfigConstant.EVENT_TYPE_CONCERT;

import com.cnhalo.largierj.constant.ConfigConstant;
import com.cnhalo.largierj.dt.ConfigItem;
import com.cnhalo.largierj.model.Concert;
import com.cnhalo.largierj.model.Configuration;
import com.cnhalo.largierj.model.ConfigurationItem;
import com.cnhalo.largierj.repository.ConcertRepository;
import com.cnhalo.largierj.repository.ConfigurationRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Service
public class AdminService {

    @Autowired
    ConfigurationRepository configurationRepository;

    @Autowired
    ConcertRepository concertRepository;

    public List<Configuration> findAllConfigurations() {
        return configurationRepository.findAll();
    }

    public List<Concert> findAllEvents() {
        return concertRepository.findAllByOrderByVisibleDescDateAsc();
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

    public Concert createConcert(Concert concert) {
        concert.setType(EVENT_TYPE_CONCERT);
        return concertRepository.save(concert);
    }

    public Concert updateConcert(Long id, Concert toUpdated) {
        Concert old = concertRepository.findById(id).get();
        if (StringUtils.hasText(toUpdated.getTitle())) {
            old.setTitle(toUpdated.getTitle());
        }
        if (StringUtils.hasText(toUpdated.getLocation())) {
            old.setLocation(toUpdated.getLocation());
        }
        if (StringUtils.hasText(toUpdated.getVenue())) {
            old.setVenue(toUpdated.getVenue());
        }
        if (toUpdated.getDate() != null) {
            old.setDate(toUpdated.getDate());
        }
        if (StringUtils.hasText(toUpdated.getLink())) {
            old.setLink(toUpdated.getLink());
        }
        old.setVisible(toUpdated.getVisible());
        old.setLastModifiedDate(new Date());
        return concertRepository.save(old);
    }

    public ConcertRepository getConcertRepository() {
        return concertRepository;
    }

    public ConfigurationRepository getConfigurationRepository() {
        return configurationRepository;
    }
}
