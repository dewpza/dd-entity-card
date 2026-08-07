# Secondary

The `secondary` section allows displaying additional information below the card title.

Unlike the standard Home Assistant cards, DD Entity Card supports multiple rows and multiple values per row.

---

# Simple text

```yaml
secondary:
  rows:
    - row:
        - text: "Simple text"
```

---

# Entity state

```yaml
secondary:
  rows:
    - row:
        - entity: sensor.outdoor_temperature
          state: true
          unit: true
```

---

# Entity attribute

```yaml
secondary:
  rows:
    - row:
        - attribute: current_temperature
        - text: " °C"
```

---

# Multiple values in one row

```yaml
secondary:
  rows:
    - row:
        - text: "Temperature: "
        - entity: sensor.outdoor_temperature
          state: true
          unit: true
```

Result

```
Temperature: 22.4 °C
```

---

# Multiple rows

```yaml
secondary:
  rows:

    - row:
        - text: "Temperature: "
        - entity: sensor.temperature
          state: true
          unit: true

    - row:
        - text: "Humidity: "
        - entity: sensor.humidity
          state: true
          unit: true

    - row:
        - text: "Pressure: "
        - entity: sensor.pressure
          state: true
          unit: true
```

---

# Formatting

Every item supports formatting options.

```yaml
secondary:
  rows:
    - row:
        - entity: sensor.temperature
          state: true
          color: green
          weight: 700
          size: 18px
          unit: true
          decimals: 1
```

---

# Mixing entities

Each row may display values from different entities.

```yaml
secondary:
  rows:
    - row:
        - text: "Boiler: "
        - entity: sensor.boiler_temperature
          state: true
          unit: true

    - row:
        - text: "Power: "
        - entity: sensor.boiler_power
          state: true
          unit: true

    - row:
        - text: "Outside: "
        - entity: sensor.outdoor_temperature
          state: true
          unit: true
```

---

# Supported item properties

| Property | Description |
|----------|-------------|
| `text` | Static text |
| `entity` | Entity to read |
| `state` | Display entity state |
| `attribute` | Display entity attribute |
| `unit` | Display entity unit |
| `color` | Text color |
| `size` | Font size |
| `weight` | Font weight |
| `decimals` | Number of decimal places |

---

# Notes

- Rows are rendered from top to bottom.
- Items inside a row are rendered from left to right.
- Text and values can be freely combined.
- Every item can reference a different entity.
