import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ldpcjyniqapufnyneaii.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcGNqeW5pcWFwdWZueW5lYWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4MjI5MTYsImV4cCI6MjAzNjM5ODkxNn0.8yUs8w8kCvVYgQ4PanIxo8ZOyOoEvudRXtE81Y6BOo0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
