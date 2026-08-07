# Styling

The DD Entity Card allows individual styling of most displayed elements.

Supported properties include:

- color
- size
- weight
- unit
- decimals

---

# Name

```yaml
name:
  value: Living room
```

Custom styling:

```yaml
name:
  value: Living room
  color: dodgerblue
  size: 18px
  weight: 700
```

---

# Value

```yaml
value:
  decimals: 1
  unit: true
```

Custom styling:

```yaml
value:
  color: orange
  size: 20px
  weight: 700
```

---

# Secondary

Every item inside `secondary.rows` can be styled independently.

```yaml
secondary:
  rows:
    - row:
        - text: "Temperature: "

        - entity: sensor.temperature
          state: true
          color: green
          weight: 700
          unit: true
```

---

# Supported styling options

| Property | Description | Example |
|----------|-------------|---------|
| color | Text color | `green` |
| size | Font size | `18px` |
| weight | Font weight | `700` |
| unit | Display unit | `true` |
| decimals | Decimal places | `1` |

---

# Examples

Green value

```yaml
color: green
```

Large value

```yaml
size: 20px
```

Bold text

```yaml
weight: 700
```

Display unit

```yaml
unit: true
```

Round number

```yaml
decimals: 2
```

---

# Combined example

```yaml
secondary:
  rows:
    - row:
        - text: "Power: "

        - entity: sensor.power
          state: true
          color: orange
          weight: 700
          size: 18px
          decimals: 0
          unit: true
```

Result:

```
Power: 512 W
```

---

# Notes

- All styling options are optional.
- Styling is applied independently to each element.
- Colors accept any valid CSS color.
- Font size accepts any valid CSS size.
- Font weight accepts numeric or keyword values.
