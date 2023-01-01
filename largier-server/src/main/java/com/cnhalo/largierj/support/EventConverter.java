package com.cnhalo.largierj.support;

import com.cnhalo.largierj.dt.Event;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Created by Henry Huang on 2022/9/24.
 */
@Component
public class EventConverter implements Converter<String, Event> {

    final
    ObjectMapper objectMapper;

    public EventConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    @SneakyThrows
    public Event convert(String s) {
        return objectMapper.readValue(s, Event.class);
    }

}
