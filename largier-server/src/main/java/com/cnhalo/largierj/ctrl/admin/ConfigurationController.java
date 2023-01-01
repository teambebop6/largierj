package com.cnhalo.largierj.ctrl.admin;

import com.cnhalo.largierj.constant.ConfigConstant;
import com.cnhalo.largierj.dt.ConfigItem;
import com.cnhalo.largierj.model.Configuration;
import com.cnhalo.largierj.service.AdminService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Henry Huang on 2022/9/25.
 */
@RestController
@RequestMapping("/api/admin/configurations")
public class ConfigurationController {

    final
    AdminService adminService;

    public ConfigurationController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping({""})
    public ResponseEntity<List<ConfigItem>> findGlobalConfig() {

        List<Configuration> configurations = adminService.getConfigurationRepository().findByGroupName(ConfigConstant.GROUP_NAME_GLOBAL);
        if (CollectionUtils.isEmpty(configurations)) {
            throw new ResourceNotFoundException();
        }

        Configuration configuration = configurations.get(0);
        return ResponseEntity.ok(configuration.getItems().stream().map(ConfigItem::convert).collect(Collectors.toList()));
    }

    @PostMapping(value = {""})
    public ResponseEntity<List<ConfigItem>> updateGlobalConfig(@NotNull @RequestBody ArrayList<ConfigItem> items) {
        return ResponseEntity.ok(adminService.updateConfigurationItems(items));
    }

}
