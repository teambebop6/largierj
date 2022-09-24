package com.cnhalo.largierj.dt;

import java.util.Collections;
import java.util.Map;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.rest.core.util.MapUtils;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Data
@Builder
public class Result<T> {

    private boolean ok;
    private T data;
    private Map<String, String> errors;

    public static <T> Result<T> ok(T data) {
        return Result.<T>builder().ok(true).data(data).build();
    }

    public static <T> Result<T> fail(String error) {
        return Result.<T>builder().ok(false).errors(Collections.singletonMap("message", error)).build();
    }

}
