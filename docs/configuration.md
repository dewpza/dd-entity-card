# Configuration

The `dd-entity-card` is designed to be highly configurable while keeping the YAML simple and readable.

## Basic configuration

```yaml
type: custom:dd-entity-card

entity: sensor.temperature
```

---

## Main options

| Option | Required | Description |
|---------|:-------:|-------------|
| `entity` | ✅ | Main entity displayed by the card. |
| `icon` | ❌ | Overrides the entity icon. |
| `name` | ❌ | Custom title configuration. |
| `secondary` | ❌ | Secondary information displayed below the title. |
| `value` | ❌ | Configuration of the value displayed on the right side. |
| `controls` | ❌ | Interactive controls (number, switch, select). |
| `tap_action` | ❌ | Tap action. |
| `hold_action` | ❌ | Hold action. |
| `double_tap_action` | ❌ | Double tap action. |

---

# Complete example

```yaml
type: custom:dd-entity-card

entity: climate.living_room

icon: mdi:air-conditioner

name:
  value: Living room

secondary:
  rows:
    - row:
        - state: true

value:
  decimals: 1
  unit: true

controls:
  - type: number

  - type: switch

  - type: select
```

---

# Configuration sections

- [Name](styling.md#name)
- [Secondary](secondary.md)
- [Value](styling.md#value)
- [Controls](controls.md)
- [Actions](actions.md)
- [Examples](examples.md)
