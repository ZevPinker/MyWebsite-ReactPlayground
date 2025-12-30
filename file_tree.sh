#!/bin/bash

# Save project file structure to a text file
# Usage: ./save_structure.sh

OUTPUT_FILE="project_structure.txt"

echo "Project Structure - $(date)" > "$OUTPUT_FILE"
echo "================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Use tree if available, otherwise use find
if command -v tree &> /dev/null; then
    tree -I 'node_modules|.git|dist|.parcel-cache|.cache' --noreport >> "$OUTPUT_FILE"
else
    find . -type f -o -type d | grep -v -E 'node_modules|\.git|dist|\.parcel-cache|\.cache' | sort >> "$OUTPUT_FILE"
fi

echo ""
echo "File structure saved to $OUTPUT_FILE"