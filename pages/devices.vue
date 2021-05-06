<template>
  <div>
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Add a new Device</h4>
        </div>

        <div class="row">
          <div class="col-4">
            <base-input
              label="Device name"
              type="text"
              aria-placeholder="Ex: Home, Office..."
            />
          </div>
          <div class="col-4">
            <base-input
              label="Device id"
              type="text"
              aria-placeholder="Ex: 7777, 8888..."
            />
          </div>
          <div class="col-4">
            <slot name="label">
              <label> Template</label>
            </slot>
            <el-select
              placeholder="Select Template"
              class="select-primary"
              style="width: 100%"
            >
              <el-option class="text-dark" value="Template 1"></el-option>
              <el-option class="text-dark" value="Template 2"></el-option>
              <el-option class="text-dark" value="Template 3"></el-option>
            </el-select>
          </div>
        </div>

        <div class="row pull-right">
          <div class="col-12">
            <BaseButton type="primary" class="mb-3" size="lg"> Add </BaseButton>
          </div>
        </div>
      </card>
    </div>
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Device</h4>
        </div>
        <el-table :data="devices">
          <el-table-column label="#" min-width="50" align="center">
            <div slot-scope="{ row, $index }">
              {{ $index + 1 }}
            </div>
          </el-table-column>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="dId" label="Device Id"></el-table-column>
          <el-table-column
            prop="templateName"
            label="Template"
          ></el-table-column>

          <el-table-column label="Actions">
            <div slot-scope="{ row, $index }">
              <el-tooltip
                content="Saver Status Indicator"
                style="margin-right: 1rem"
              >
                <i
                  class="fas fa-database"
                  :class="{
                    'text-success': row.saverRule,
                    'text-dark': !row.saverRule,
                  }"
                />
              </el-tooltip>
              <el-tooltip content="Database Saver">
                <base-switch
                  @click="updateSaverRuleStatus($index)"
                  :value="row.saverRule"
                  type="primary"
                  on-text="On"
                  off-text="Off"
                >
                </base-switch>
              </el-tooltip>
              <el-tooltip
                content="Delete"
                effect="light"
                :open-delay="300"
                placement="top"
              >
                <base-button
                  type="danger"
                  icon
                  size="sm"
                  class="btn-link"
                  @click="deleteDevice(row)"
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </el-tooltip>
            </div>
          </el-table-column>
        </el-table>
      </card>
    </div>

    <json :value="devices" />
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import BaseSwitch from "../components/BaseSwitch.vue";
import Json from "../components/Json.vue";
export default {
  components: {
    Json,
    BaseSwitch,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  data() {
    return {
      devices: [
        {
          name: "Home",
          dId: "8888",
          templateName: "Power Sensor",
          templalteId: "1234x9817239812-98",
          saverRule: false,
        },
        {
          name: "Office",
          dId: "8888",
          templateName: "Power Sensor",
          templalteId: "1234x9817239812-98",
          saverRule: true,
        },
        {
          name: "Workshop",
          dId: "8888",
          templateName: "Power Sensor",
          templalteId: "1234x9817239812-98",
          saverRule: false,
        },
      ],
    };
  },
  methods: {
    deleteDevice(device) {
      alert(`Deleting ${device.name}`);
    },
    updateSaverRuleStatus(index) {
      this.devices[index].saverRule = !this.devices[index].saverRule;
    },
  },
};
</script>