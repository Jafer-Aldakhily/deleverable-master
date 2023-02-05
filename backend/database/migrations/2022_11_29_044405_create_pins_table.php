<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pins', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("about");
            $table->string("destination");
            $table->foreignId("category_id")->constrained("categories");
            $table->string("user_id");
            $table->string("number_of_saved")->default(0);
            $table->string("image"); // yet for now just
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pins');
    }
};
