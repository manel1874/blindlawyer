const contractSuggestionsSchema = [
    {
      name: "contractSuggestions",
      type: "array",
      description: "An array of clause suggestions extracted from the contract document.",
      children: [
        { name: "type", type: "string", description: "Clause type." },
        { name: "title", type: "string", description: "Clause title." },
        { name: "description", type: "string", description: "Clause description." },
        { name: "exactClause", type: "string", description: "Exact text of the clause." },
      ],
    },
  ]

  export default contractSuggestionsSchema;