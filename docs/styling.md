# Styling

DD Entity Card supports styling individual elements of the card.

Styling options can be used for:

- Card name
- Card value
- Secondary text
- Secondary row items

---

## Color

Use `color` to change the text color.

```yaml
name:
  value: Bojler doma
  color: green
```

Colors can also be applied to secondary items:

```yaml
secondary:
  rows:
    - row:
        - text: "Teplota: "
          color: green
        - entity: sensor.teplota_bojler
          state: true
          color: green
```

CSS color values are supported, for example:

```yaml
color: red
```

```yaml
color: "#00ff00"
```

The following Home Assistant color names are also supported:

```yaml
color: primary
color: secondary
color: warning
color: error
color: success
```

---

## Font size

Use `size` to change the font size.

```yaml
name:
  value: Bojler doma
  size: 18px
```

Example for secondary information:

```yaml
secondary:
  rows:
    - row:
        - entity: sensor.teplota_bojler
          state: true
          size: 14px
```

---

## Font weight

Use `weight` to change the font weight.

```yaml
name:
  value: Bojler doma
  weight: 700
```

For secondary items:

```yaml
secondary:
  rows:
    - row:
        - text: "Teplota: "
          weight: 700
```

Numeric CSS font weights can be used:

```yaml
weight: 400
weight: 500
weight: 700
```

---

## Decimal places

Use `decimals` to control the number of decimal places.

```yaml
value:
  decimals: 1
```

For secondary values:

```yaml
secondary:
  rows:
    - row:
        - entity: sensor.teplota_bojler
          state: true
          decimals: 1
```

Examples:

```text
22.5
22.50
23
```

depending on the configured value.

---

## Units

Use `unit: true` to display the entity unit.

```yaml
secondary:
  rows:
    - row:
        - entity: sensor.temperature
          state: true
          unit: true
```

The unit is taken from the entity.

For climate entities, temperature values use the climate entity's configured temperature unit:

```yaml
secondary:
  rows:
    - row:
        - attribute: current_temperature
          decimals: 1
          unit: true
```

Result:

```text
22.5 °C
```

---

## Styling the card name

```yaml
name:
  value: Obývačka
  color: primary
  size: 18px
  weight: 700
```

---

## Styling the main value

```yaml
value:
  decimals: 1
  unit: true
  color: orange
  size: 24px
  weight: 700
```

---

## Styling secondary rows

Each item can be styled independently.

```yaml
secondary:
  rows:
    - row:
        - text: "Aktuálna: "
          color: secondary
          weight: 500

        - entity: sensor.teplota_bojler
          state: true
          color: green
          size: 14px
          weight: 700
          decimals: 1
          unit: true
```

---

## Combined example

```yaml
type: custom:dd-entity-card

entity: climate.living_room

name:
  value: Obývačka
  color: primary
  size: 18px
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
          weight: 700

value:
  decimals: 1
  unit: true
  color: orange
  weight: 700
```

---

## Supported styling options

| Property | Description | Example |
|---|---|---|
| `color` | Text color | `green` |
| `size` | Font size | `14px` |
| `weight` | Font weight | `700` |
| `decimals` | Number of decimal places | `1` |
| `unit` | Display entity unit | `true` |

---

## Notes

- Styling can be applied independently to individual elements.
- `decimals` affects numeric values.
- `unit: true` uses the unit provided by the entity.
- Climate temperature values use the climate entity's configured temperature unit.
- Secondary row text can be styled in the same way as entity values.
