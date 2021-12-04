let file_name = "input.txt"

let read_file file_name : string list =
  let ic = open_in file_name in
  let try_read () =
    try Some (input_line ic) with End_of_file -> None
  in
  let rec loop acc =
    match try_read () with
    | Some line -> loop (line :: acc)
    | None -> close_in ic; List.rev acc
  in
  loop []

let () =
  let inputs = read_file file_name in

  let count_bit1_occurrences (inputs: string list) idx =
    List.fold_left (fun a s -> if String.get s idx == '1' then 1 + a else a) 0 inputs
  in

  let decimal_of_binary s = int_of_string ("0b" ^ s) in

  let exercise_1 inputs =
    let gammaRate, epsilonRate =
      List.fold_left (fun (gammaRate, epsilonRate) idx ->
        let bit1Counter = count_bit1_occurrences inputs idx in
        if (bit1Counter > (List.length inputs) / 2) then
          (gammaRate ^ "1", epsilonRate ^ "0")
        else
          (gammaRate ^ "0", epsilonRate ^ "1")
      ) ("", "") (List.init (String.length (List.nth inputs 0)) (fun x -> x))
    in
    (decimal_of_binary gammaRate) * (decimal_of_binary epsilonRate)
  in

  let exercise_2 inputs =
    let oxygen_generator_rating, co2_scrubber_rating =
      List.fold_left (fun (oxygen_generator_rating, co2_scrubber_rating) idx ->
        let bit1Counter = count_bit1_occurrences oxygen_generator_rating idx in
        let oxygen_generator_rating =
          if ((List.length oxygen_generator_rating) > 1) then
            if ((float_of_int bit1Counter) < (float_of_int (List.length oxygen_generator_rating)) /. 2.) then
              List.filter (fun s -> String.get s idx == '1' ) oxygen_generator_rating
            else
              List.filter (fun s -> String.get s idx == '0' ) oxygen_generator_rating
          else
            oxygen_generator_rating
        in
        let bit1Counter = count_bit1_occurrences co2_scrubber_rating idx in
        let co2_scrubber_rating =
          if ((List.length co2_scrubber_rating) > 1) then
            if ((float_of_int bit1Counter) < (float_of_int (List.length co2_scrubber_rating)) /. 2.) then
              List.filter (fun s -> String.get s idx == '0' ) co2_scrubber_rating
            else
              List.filter (fun s -> String.get s idx == '1' ) co2_scrubber_rating
          else
            co2_scrubber_rating
        in
        (oxygen_generator_rating, co2_scrubber_rating)
      ) (inputs, inputs) (List.init (String.length (List.nth inputs 0)) (fun x -> x))
    in
    (decimal_of_binary (List.nth oxygen_generator_rating 0)) * (decimal_of_binary (List.nth co2_scrubber_rating 0))
  in

  Printf.printf "Exercise 1: %d\n" (exercise_1 inputs);
  Printf.printf "Exercise 2: %d\n" (exercise_2 inputs);
