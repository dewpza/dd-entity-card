# Examples

DD Entity Card can be used for simple sensors as well as more complex controls.

The `examples/` directory contains ready-to-use YAML configurations.

---

## Basic

Simple entity card:

```yaml
type: custom:dd-entity-card

entity: sensor.temperature
```

See:

[`examples/basic.yaml`](../examples/basic.yaml)

---

## Number control

Number control with configurable step:

```yaml
controls:
  - type: number
    step: 0.5
```

See:

[`examples/number.yaml`](../examples/number.yaml)

---

## Switch

A switch can control the main entity or a different entity:

```yaml
controls:
  - type: switch
    entity: switch.boiler
```

See:

[`examples/switch.yaml`](../examples/switch.yaml)

---

## Climate

Climate entities support:

- target temperature
- HVAC mode selection
- power control
- current temperature
- temperature units
- decimal formatting

Example:

```yaml
type: custom:dd-entity-card

entity: climate.living_room

name:
  value: Obývačka

secondary:
  rows:
    - row:
        - text: "Aktuálna: "
        - attribute: current_temperature
          decimals: 1
          unit: true

value:
  decimals: 1
  unit: true

controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select
```

See:

[`examples/climate.yaml`](../examples/climate.yaml)

---

## Secondary rows

Multiple rows can be used to display additional information.

```yaml
secondary:
  rows:

    - row:
        - text: "Teplota: "
        - entity: sensor.temperature
          state: true
          decimals: 1
          unit: true

    - row:
        - text: "Výkon: "
        - entity: sensor.power
          state: true
          unit: true
```

See:

[`examples/secondary_rows.yaml`](../examples/secondary_rows.yaml)

---

## Multiple entities

Different entities can be displayed and controlled by the same card.

```yaml
entity: input_number.target_temperature

secondary:
  rows:
    - row:
        - entity: sensor.current_temperature
          state: true
          unit: true

controls:
  - type: number
    step: 0.5

  - type: switch
    entity: switch.heater
```

See:

[`examples/multiple_entities.yaml`](../examples/multiple_entities.yaml)

---

## Boiler

A typical boiler configuration can use an `input_number` for the target temperature, a sensor for the actual temperature and a switch for power control.

```yaml
type: custom:dd-entity-card

entity: input_number.nastavena_teplota_bojlera

name:
  value: Bojler doma

secondary:
  rows:
    - row:
        - text: "Teplota: "
          color: secondary

        - entity: sensor.teplota_bojler
          state: true
          decimals: 1
          unit: true
          color: green

controls:
  - type: number
    step: 0.5

  - type: switch
    entity: switch.boiler

tap_action:
  action: more-info
  entity: sensor.teplota_bojler
```

Clicking the card opens the actual temperature sensor instead of the target temperature input.

See:

[`examples/boiler.yaml`](../examples/boiler.yaml)

---

## Styling

Individual elements can be styled.

```yaml
name:
  value: Obývačka
  color: primary
  size: 18px
  weight: 700

secondary:
  rows:
    - row:
        - text: "Teplota: "
          color: green

        - entity: sensor.temperature
          state: true
          color: green
          decimals: 1
          unit: true
```

See:

[`examples/styling.yaml`](../examples/styling.yaml)

---

## Advanced

A more complete configuration combining several features:

```yaml
type: custom:dd-entity-card

entity: climate.living_room

icon:
  value: mdi:air-conditioner
  color: primary

name:
  value: Obývačka
  weight: 700

secondary:
  rows:
    - row:
        - text: "Aktuálna: "
          color: secondary

        - attribute: current_temperature
          decimals: 1
          unit: true
          color: green

    - row:
        - text: "Výkon: "
        - entity: sensor.ac_power
          state: true
          decimals: 0
          unit: true

value:
  decimals: 1
  unit: true

controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select

tap_action:
  action: more-info
```

See:

[`examples/advanced.yaml`](../examples/advanced.yaml)

---

# Example files

| Example | Description |
|---|---|
| [`basic.yaml`](../examples/basic.yaml) | Basic entity card |
| [`number.yaml`](../examples/number.yaml) | Number control |
| [`secondary_rows.yaml`](../examples/secondary_rows.yaml) | Secondary rows |
| [`switch.yaml`](../examples/switch.yaml) | Switch control |
| [`climate.yaml`](../examples/climate.yaml) | Climate card |
| [`boiler.yaml`](../examples/boiler.yaml) | Boiler example |
| [`multiple_entities.yaml`](../examples/multiple_entities.yaml) | Multiple entities |
| [`styling.yaml`](../examples/styling.yaml) | Styling |
| [`advanced.yaml`](../examples/advanced.yaml) | Advanced configuration |

---

# Related documentation

- [Configuration](configuration.md)
- [Controls](controls.md)
- [Secondary](secondary.md)
- [Styling](styling.md)
- [Actions](actions.md)
