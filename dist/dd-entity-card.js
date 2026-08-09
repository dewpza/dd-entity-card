/******************************************************************************
 *
 * DD Entity Card
 * Version: 0.1.0-dev
 *
 * A modern and highly configurable Home Assistant Lovelace card
 * with support for multiple entities, advanced layouts and
 * interactive controls.
 *
 * ----------------------------------------------------------------------------
 * GitHub:
 * https://github.com/dewpza/dd-entity-card
 *
 * Author:
 * Ing. Dušan Ďurica
 *
 * License:
 * MIT
 *
 * Compatible with:
 * Home Assistant 2026.8+
 *
 ******************************************************************************/
const DD_ENTITY_CARD_VERSION = "0.1.0-dev";

class DDEntityCard extends HTMLElement {

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Entity is required");
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.card) {
      this.createCard();
    }
    this.render();
  }

  createCard() {

    this.card = document.createElement("ha-card");
    this.card.innerHTML = `
      <style>
        .container{
          display:flex;
          align-items:center;
          gap:16px;
          padding:16px;
        }
        .icon{
          width:48px;
          display:flex;
          justify-content:center;
          align-items:center;
        }
        .info{
          flex:1;
          overflow:hidden;
        }
        .name{
          font-size:16px;
          font-weight:600;
        }
        .secondary{
          color:var(--secondary-text-color);
          font-size:13px;
          margin-top:4px;
        }
        .value{
          font-size:28px;
          font-weight:700;
          text-align:right;
          min-width:70px;
        }
        ha-icon{
          --mdc-icon-size:32px;
          color:var(--state-icon-color);
        }   
        .switch-button.active{
          background: var(--primary-color);
          color: white;
        }
        .switch-button ha-icon{
          --mdc-icon-size:20px;
        }
        .value-container{
          display:flex;
          flex-direction:column;
          align-items:flex-end;
          gap:8px;
        }
        .controls{
          display:flex;
          flex-direction:column;
          align-items:flex-end;
          gap:8px;
        }
        .controls-top{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .controls-bottom{
          display:flex;
          justify-content:flex-end;
          width:100%;
        }
        .control-button{
          width:30px;
          height:30px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:none;
          border-radius:50%;
          background:var(--secondary-background-color);
          cursor:pointer;
        }
.number-value{
  min-width:60px;
  text-align:center;
  font-size:24px;
  font-weight:400;
  white-space:nowrap;
}
        .control-button ha-icon{
          --mdc-icon-size:18px;
        }
        ha-switch{
          margin-left:6px;
        }
        .secondary{
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .secondary-row{
          line-height:1.2;
        }
        .select-controls{
          display:flex;
          gap:6px;
          margin-top:6px;
          flex-wrap:wrap;
        }
        .select-button{
          width:34px;
          height:34px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:none;
          border-radius:50%;
          cursor:pointer;
          background:var(--secondary-background-color);
          color:var(--primary-text-color);
          padding:0;
        }
        .select-button ha-icon{
          --mdc-icon-size:20px;
        }
        .select-button.active{
          background:var(--primary-color);
          color:white;
        }
        .number-box{
          display:flex;
          align-items:center;
          border-radius:20px;
          padding:2px 6px;
          background:
          var(--secondary-background-color);
        }
        .control-button:hover{
          background:var(--primary-color);
          color:white;
        }
        
@media (max-width: 600px){

    .container{
        gap:10px;
        padding:12px;
    }
    .icon{
        width:40px;
        flex-shrink:0;
    }

    .info{
        min-width:0;
    }

    .value-container{
        gap:5px;
        flex-shrink:0;
    }

    .value{
        font-size:22px;
        min-width:54px;
    }

    .number-value{
        min-width:54px;
        font-size:22px;
    }

    .control-button{
        width:28px;
        height:28px;
    }

    .select-button{
        width:30px;
        height:30px;
    }

    .select-controls{
        gap:4px;
    }
}
      </style>
      <div class="container">
        <div class="icon">
          <ha-icon></ha-icon>
        </div>
        <div class="info">
          <div class="name"></div>
          <div class="secondary"></div>
        </div>
      <div class="value-container">
        <div class="value"></div>
        <div class="controls">
          <div class="controls-top"></div>
          <div class="controls-bottom"></div>
        </div>
      </div>
      </div>
    `;

    this.appendChild(this.card);
    this.card.style.cursor = "pointer";
    this.card.addEventListener("click", (ev) => {
    if (ev.target.closest(".controls")) {
        return;
    }
    this.handleTap();
    });

    this.elements = {
        icon: this.card.querySelector("ha-icon"),
        name: this.card.querySelector(".name"),
        secondary: this.card.querySelector(".secondary"),
        value: this.card.querySelector(".value"),
        controls: this.card.querySelector(".controls"),
        controlsTop: this.card.querySelector(".controls-top"),
        controlsBottom: this.card.querySelector(".controls-bottom")
    };

    this.createControls();
}

createControls() {

    this.elements.minusButton = document.createElement("button");
    this.elements.minusButton.className = "control-button";
    this.elements.minusButton.innerHTML = '<ha-icon icon="mdi:minus"></ha-icon>';
    this.elements.plusButton = document.createElement("button");
    this.elements.plusButton.className = "control-button";
    this.elements.plusButton.innerHTML = '<ha-icon icon="mdi:plus"></ha-icon>';
    this.elements.minusButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.changeValue(-1);
    });
    this.elements.plusButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.changeValue(1);
    });
    this.elements.numberBox = document.createElement("div");
    this.elements.numberBox.className = "number-box";
    this.elements.numberValue = document.createElement("span");
    this.elements.numberValue.className = "number-value";
    this.elements.numberBox.appendChild(this.elements.minusButton);
    this.elements.numberBox.appendChild(this.elements.numberValue);
    this.elements.numberBox.appendChild(this.elements.plusButton);
    this.elements.controlsTop.appendChild(this.elements.numberBox);
    this.elements.switch = document.createElement("button");
    this.elements.switch.className = "control-button switch-button";
    this.elements.switch.innerHTML = '<ha-icon icon="mdi:power"></ha-icon>';
    this.elements.switch.style.display = "none";
    this.elements.controlsTop.appendChild(this.elements.switch);
    this.elements.switch.addEventListener(
    "click",
    async (e) => {
        e.stopPropagation();
        const control = this.getControl("switch");
        const entity =
            control?.entity
                ? this._hass.states[control.entity]
                : this.getEntity();
        if (!entity) {
            return;
        }
        const domain = entity.entity_id.split(".")[0];
        const isOn = entity.state === "on";
        await this._hass.callService(
            domain,
            isOn
                ? "turn_off"
                : "turn_on",
            {
                entity_id: entity.entity_id
            }
        );

    }
    );
    this.elements.select = document.createElement("div");
    this.elements.select.id = "moja-select";
    this.elements.select.className = "select-controls";
    this.elements.controlsBottom.appendChild(this.elements.select);
}


render() {

    const entity = this.getEntity();

    if (!entity) {
        this.renderMissing();
        return;
    }

    this.renderIcon(entity);
    this.renderElement(this.elements.name, this.getName(entity), entity, this.getOptions(this.config.name));
    this.renderSecondary(entity);
    this.renderValue(entity);
    this.renderControls(entity);
}

renderMissing() {

    this.elements.icon.icon = "mdi:alert";
    this.elements.name.textContent =
    this.config.entity;
    this.elements.secondary.textContent =  "Entity not found";
    this.elements.value.textContent = "-";

}

renderIcon(entity) {

    this.elements.icon.icon =  this.getIcon(entity);
    this.elements.icon.style.color =
        this.getColor(
            this.getIconColor(entity)
        );

}

renderText(entity) {

    this.renderElement(this.elements.name, this.getName(entity), entity, this.getOptions(this.config.name));
    this.renderElement(this.elements.secondary, this.getSecondary(entity), entity, this.getOptions(this.config.secondary));

}

renderSecondary(entity) {

    const config = this.config.secondary;

    if (config && typeof config === "object" && Array.isArray(config.rows)) {
        this.renderSecondaryRows(entity, config.rows);
        return;
    }

    if (!Array.isArray(config)) {
        this.renderElement(
            this.elements.secondary,
            this.getSecondary(entity),
            entity,
            this.getOptions(config)
        );
        return;
    }

    const text = config.map(item => {
        if (item.text !== undefined) {
            return item.text;
        }
        return this.formatValue(
            this.resolveValue(item, entity),
            entity,
            item
        );

    }).join("");
    this.elements.secondary.textContent = text;

}

renderSecondaryRows(entity, rows) {

    this.elements.secondary.innerHTML = "";
    for (const rowConfig of rows) {
        const row = document.createElement("div");
        row.className = "secondary-row";
        for (const item of rowConfig.row) {
            const span = document.createElement("span");
            if (item.text !== undefined) {
                span.textContent = item.text;
            } else {
                const sourceEntity =
                    item.entity
                        ? this._hass.states[item.entity]
                        : entity;
                this.renderElement(
                    span,
                    this.resolveValue(item, entity),
                    sourceEntity,
                    item
                );
            }
            row.appendChild(span);
        }
        this.elements.secondary.appendChild(row);
    }

}

renderControls(entity) {

    if (entity.state === "unavailable" || entity.state === "unknown" ) {
        this.elements.controls.style.display = "none";
        return;
    }
    const controls = this.getControls();

    if (controls.length === 0) {
        this.elements.controls.style.display = "none";
        return;
    }

    this.elements.controls.style.display = "";
    const numberControl = this.getControl("number");

    if (numberControl) {
        this.elements.numberBox.style.display = "";
        this.elements.numberValue.textContent =
            this.formatValue(this.getValue(entity), entity, this.getOptions(this.config.value));
    } else {
        this.elements.numberBox.style.display = "none";
    }  
    const switchControl = this.getControl("switch");

    if (switchControl) {
        this.elements.switch.style.display = "";
        const switchEntity =
            switchControl.entity
                ? this._hass.states[switchControl.entity]
                : entity;
        const isOn = switchEntity?.state === "on";
        this.elements.switch.classList.toggle("active", isOn);
    } else {
        this.elements.switch.style.display = "none";
    }

    this.elements.minusButton.disabled = this.isDecreaseDisabled(entity);
    this.elements.plusButton.disabled = this.isIncreaseDisabled(entity);
    this.elements.value.style.display = numberControl ? "none" : "";
    const selectControl = this.getControl("select");
    if (selectControl) {
        this.renderOptions(entity);
    } else {
        this.elements.select.style.display = "none";
    }

}


renderOptions(entity) {

    const control = this.getControl("select");

    const selectEntity =
        control?.entity
            ? this._hass.states[control.entity]
            : entity;

    if (!selectEntity) {
        return;
    }

    this.elements.select.innerHTML = "";
    this.elements.select.style.display = "";

    if (!selectEntity.entity_id.startsWith("climate.")) {
        return;
    }

    const modes = selectEntity.attributes.hvac_modes ?? [];

    for (const mode of modes) {

        const button = document.createElement("button");
        button.className = "select-button";
        button.innerHTML = `
    <ha-icon
        icon="${this.getClimateModeIcon(mode)}">
    </ha-icon>
`;

        if (mode === selectEntity.state) {
            button.classList.add("active");
        }

        button.addEventListener("click", async (e) => {

            e.stopPropagation();

            await this._hass.callService(
                "climate",
                "set_hvac_mode",
                {
                    entity_id: selectEntity.entity_id,
                    hvac_mode: mode
                }
            );

        });

        this.elements.select.appendChild(button);
    }
}


getClimateModeIcon(mode) {

    switch (mode) {

        case "off":
            return "mdi:power";

        case "heat":
            return "mdi:fire";

        case "cool":
            return "mdi:snowflake";

        case "dry":
            return "mdi:water-percent";

        case "fan_only":
            return "mdi:fan";

        case "auto":
            return "mdi:autorenew";

        default:
            return "mdi:help-circle";
    }

}

async changeValue(direction) {

    const entity = this.getEntity();

    if (!entity) {
        return;
    }

    if (entity.entity_id.startsWith("input_number.")) {
    const control = this.getControl("number");

    const step = Number(
        control?.step ??
        entity.attributes.step ??
        1
    );

    let value = Number(entity.state) + direction * step;

    // zaokrúhlenie podľa kroku
    const decimals = (step.toString().split(".")[1] || "").length;

    value = Number(value.toFixed(decimals));

    const min = Number(entity.attributes.min);
    const max = Number(entity.attributes.max);

    value = Math.max(min, Math.min(max, value));

    await this._hass.callService(
      "input_number",
      "set_value",
      {
        entity_id: entity.entity_id,
        value: value
      }
    );

    } else if (entity.entity_id.startsWith("climate.")) {

    const control = this.getControl("number");

    const step = Number(
        control?.step ??
        entity.attributes.target_temp_step ??
        0.5
    );

  let value =
    Number(entity.attributes.temperature) +
    direction * step;

  value = Number(
    value.toFixed(
      (step.toString().split(".")[1] || "").length
    )
  );

  if (entity.attributes.min_temp !== undefined) {
    value = Math.max(
      entity.attributes.min_temp,
      value
    );
  }

  if (entity.attributes.max_temp !== undefined) {
    value = Math.min(
      entity.attributes.max_temp,
      value
    );
  }

  await this._hass.callService(
    "climate",
    "set_temperature",
    {
      entity_id: entity.entity_id,
      temperature: value
    }
  );

}

}

isDecreaseDisabled(entity) {

  const state = Number(this.getValue(entity));

  if (isNaN(state)) {
    return false;
  }

  if (entity.attributes.min !== undefined) {
    return state <= entity.attributes.min;
  }

  if (entity.attributes.min_temp !== undefined) {
    return state <= entity.attributes.min_temp;
  }

  return false;

}

isIncreaseDisabled(entity) {

  const state = Number(this.getValue(entity));

  if (isNaN(state)) {
    return false;
  }

  if (entity.attributes.max !== undefined) {
    return state >= entity.attributes.max;
  }

  if (entity.attributes.max_temp !== undefined) {
    return state >= entity.attributes.max_temp;
  }

  return false;

}

renderValue(entity) {

    this.renderElement(this.elements.value, this.getValue(entity), entity, this.getOptions(this.config.value));

}

handleTap() {

  const action =
    this.config.tap_action ??
    { action: "more-info" };

  switch (action.action) {

    case "more-info":
      this.showMoreInfo();
      break;

    default:
      console.warn(
        "Unsupported tap_action:",
        action.action
      );

  }

}

showMoreInfo() {

  const event = new Event(
    "hass-more-info",
    {
      bubbles: true,
      composed: true
    }
  );

  event.detail = {
    entityId: this.config.entity
  };

  this.dispatchEvent(event);

}

getEntity() {

    return this._hass.states[this.config.entity];

}

getIcon(entity) {

  return this.getSectionValue(
    "icon",
    entity,
    entity.attributes.icon ??
    "mdi:help-circle"
  );

}

getIconColor(entity) {

  const config = this.config.icon;

  if (
    typeof config === "object" &&
    config !== null &&
    "color" in config
  ) {
    return this.resolveValue(
      config.color,
      entity
    );
  }

  return "var(--state-icon-color)";
}

getName(entity) {

  return this.getSectionValue(
    "name",
    entity,
    entity.attributes.friendly_name ??
    entity.entity_id
  );

}

getSecondary(entity) {

  return this.getSectionValue(
    "secondary",
    entity,
    entity.entity_id
  );

}

getValue(entity) {

  // Ak je používateľská konfigurácia, použijeme ju
  const configured = this.getSectionValue(
    "value",
    entity,
    undefined
  );

  if (configured !== undefined) {
    return configured;
  }

  switch (entity.entity_id.split(".")[0]) {

    case "climate":
      return entity.attributes.temperature;

    case "cover":
      return entity.attributes.current_position;

    case "light":
      if (entity.attributes.brightness !== undefined) {
        return Math.round(
          entity.attributes.brightness / 255 * 100
        );
      }
      return entity.state;

    default:
      return entity.state;

  }

}

getColor(value) {

  switch (value) {

    case "primary":
      return "var(--primary-color)";

    case "secondary":
      return "var(--secondary-text-color)";

    case "warning":
      return "var(--warning-color)";

    case "error":
      return "var(--error-color)";

    case "success":
      return "var(--success-color)";

    default:
      return value;
  }

}
  
resolveValue(value, entity) {

  if (value === undefined || value === null) {
    return undefined;
  }

  // jednoduchý text alebo číslo
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  // objekt
  if (typeof value === "object") {
    return this.resolveObject(value, entity);
  }

  return undefined;
}



resolveObject(config, entity) {

  let sourceEntity = entity;

  // iná entita
  if ("entity" in config) {
    sourceEntity = this._hass.states[config.entity];

    if (!sourceEntity) {
      return undefined;
    }
  }

  // atribút
  if ("attribute" in config) {
    return sourceEntity.attributes[config.attribute];
  }

  // stav
  if ("state" in config) {
    return sourceEntity.state;
  }

  // ak je zadaná len entita
  if ("entity" in config) {
    return sourceEntity.state;
  }

  return undefined;
}

getOptions(config) {

  if (
    typeof config === "object" &&
    config !== null
  ) {
    return config;
  }

  return {};

}

getControls() {

  if (!this.config.controls) {
    return [];
  }

  // nový zápis
  if (Array.isArray(this.config.controls)) {
    return this.config.controls;
  }

  // starý zápis
  return [this.config.controls];

}

getControl(type) {

  return this.getControls().find(
    control => control.type === type
  );

}

getSectionValue(section, entity, fallback) {

  const config = this.config[section];

  if (config === undefined || config === null) {
    return fallback;
  }

  // Jednoduchá hodnota
  if (typeof config !== "object") {
    const value = this.resolveValue(config, entity);
    return value !== undefined ? value : fallback;
  }

  // Nový zápis:
  // entity:, attribute:, state:
  if (
    "entity" in config ||
    "attribute" in config ||
    "state" in config
  ) {
    const value = this.resolveValue(config, entity);
    return value !== undefined ? value : fallback;
  }

  // Starý zápis:
  // value:
  if ("value" in config) {
    const value = this.resolveValue(config.value, entity);
    return value !== undefined ? value : fallback;
  }

  return fallback;
}

formatValue(value, entity, options = {}) {

  if (value === undefined || value === null) {
    return "";
  }

  let result = value;

  // Zaokrúhlenie
  const number = Number(result);

  if (!isNaN(number) && options.decimals !== undefined) {
    result = number.toFixed(options.decimals);
  }

  // Jednotka
  if (options.unit) {

    let unit = "";

    if (options.unit === true) {
      unit = entity.attributes.unit_of_measurement ?? "";
    } else {
      unit = options.unit;
    }

    if (unit) {
      result += " " + unit;
    }
  }

  return String(result);
}

renderElement(element, value, entity, options = {}) {

  const formatted = this.formatValue(
    value,
    entity,
    options
  );

  element.textContent = formatted;

  element.style.display =
    formatted ? "" : "none";

  // farba
  if (options.color) {
    const color = this.resolveValue(
    options.color, entity
    );
    element.style.color = this.getColor(color);
  } else {
    element.style.color = "";
  }
  
  if (options.size) {
        element.style.fontSize = options.size;
  } else {
        element.style.fontSize = "";
  }

  if (options.weight) {
        element.style.fontWeight = options.weight;
  } else {
        element.style.fontWeight = "";
  }

}

getCardSize() {
    return 2;
}

}
customElements.define("dd-entity-card", DDEntityCard);
