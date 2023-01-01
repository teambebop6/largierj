package com.cnhalo.largierj.dt;

import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/10/13.
 */
@Data
public class UpdateVisibleCommand {

    @NotNull
    private List<Long> ids;
    private boolean visible;

}
