<!-- Footer -->
<footer class="sticky-footer bg-white">
    <div class="container my-auto">
        <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2021</span>
        </div>
    </div>
</footer>
<!-- End of Footer -->


<script>
    @if(Session::has("success"))
    toastr.options =
    {
        "closeButton" : true,
        "progressBar" : true
    }
            toastr.success("Successfully");
    @endif
  </script>