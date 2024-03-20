### Hexlet tests and linter status:

[![Actions Status](https://github.com/AndreyYudin03/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AndreyYudin03/frontend-project-46/actions)

---

[![Actions Status](https://github.com/AndreyYudin03/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/AndreyYudin03/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/0b6d0f380130b0900ddb/maintainability)](https://codeclimate.com/github/AndreyYudin03/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/0b6d0f380130b0900ddb/test_coverage)](https://codeclimate.com/github/AndreyYudin03/frontend-project-46/test_coverage)

# Description 📃

**GenDiff** - is a command-line tool for comparing and then displaying the difference between two JSON or YAML/YML files.

# Installation 💿

1. [Install Node.js](https://nodejs.org/en)

2. Clone repository: `git clone https://github.com/AndreyYudin03/frontend-project-46.git`
3. Install all dependencies: `npm install`

# Usage 💻

<h4>There are **3 styles** to choose from for displaying the difference between two files:</h4>

- **_stylish_** - by default

- **_plain_**

- **_json_**

---

`gendiff -f [type] file_path_1 file_path_2`

<h3>Options:</h3>

- `-f, --format [type]`: output format (available options: **stylish**, **plain**, **json**).
- `file_path_1`: the path to the first file.
- `file_path_2`: the path to the second file.

---

<h3>Usage example:</h3>

```
# Compare two files in stylish format
gendiff path/to/file1.json path/to/file2.json

# Compare two files in plain format
gendiff -f plain path/to/file1.json path/to/file2.yaml

# Compare two files in json format
gendiff -f json path/to/file1.yaml path/to/file2.yml
```

# Demonstration 🎥

- [Flat json files [ stylish format ]](https://asciinema.org/a/RmTkkW7KCzwCqxSqIpcUjyFez)

- [Flat yaml files [ stylish format ]](https://asciinema.org/a/bvYT8fwx1zbaJPaBosqZUZ0Vg)

---

- [Deep json files [ stylish format ]](https://asciinema.org/a/tiZsBIPGuTbgyfpsqkHLWbiZH)

- [Deep json files [ plain format ]](https://asciinema.org/a/rXCdonMu9unlqfmVPqSaUyTkL)

- [Deep json files [ json format ]](https://asciinema.org/a/egmYvQywef1SjvLflXcuSAUZG)

# Minimum requirements 🔧

- OS: Windows, macOS or Linux.
- Node.js is not lower than v19.9.0
